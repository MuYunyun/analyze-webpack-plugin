import * as d3 from 'd3'
import { getColor } from './colors'
import { markDuplicates, getAllChildren, getAncestors } from './partitionedDataUtils'

const FADE_OPACITY = 0.5
let paths, vis, totalSize

export default function createVisualization({ svgElement, json, onHover, onUnhover }) {
  let chartSize = (json.maxDepth > 9) ? 950 : 750
  let radius = Math.min(chartSize, chartSize) / 2

  let partition = d3.partition()
    .size([2 * Math.PI, radius * radius])

  let arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .innerRadius(d => Math.sqrt(d.y0))
    .outerRadius(d => Math.sqrt(d.y1))

  if (vis) {
    svgElement.innerHTML = ''
  }

  // Turn the data into a d3 hierarchy and calculate the sums.
  const root = d3.hierarchy(json)
    .sum(d => d.size)
    .sort((a, b) => b.value - a.value)

  // Filter out very small nodes
  let nodes = partition(root).descendants()
    .filter(d => d.x1 - d.x0 > 0.005) // 0.005 radians = 0.29 degrees

  markDuplicates(nodes)

  vis = d3.select(svgElement)
    .attr('width', chartSize)
    .attr('height', chartSize)
    .append('svg:g')
    .attr('id', 'svgWrapper')
    .attr('transform', `translate(${chartSize / 2}, ${chartSize / 2})`)

  paths = vis.data([json]).selectAll('path')
    .data(nodes)
    .enter()
    .append('svg:path')
    .attr('display', d => (d.depth ? null : 'none'))
    .attr('d', arc)
    .attr('fill-rule', 'evenodd')
    .style('stroke', d => (d.duplicate) ? '#000' : '')
    .style('fill', d => getColor(d))
    .style('opacity', 1)
    .on('mouseover', object => {
      mouseover(object, onHover)
    })

  totalSize = paths.node().__data__.value

  let svgWrapper = vis._groups[0][0]
  let chart = svgElement.parentNode

  let visHeight = svgWrapper.getBoundingClientRect().height

  let topPadding = (svgWrapper.getBoundingClientRect().top + window.scrollY) - (d3.select(chart)._groups[0][0].getBoundingClientRect().top + window.scrollY)

  d3.select(svgElement).attr('height', visHeight)
  vis.attr('transform', `translate(${chartSize / 2}, ${(chartSize / 2) - topPadding})`)
  d3.select(chart.querySelector('.details')).style('margin-top', `${-topPadding}px`)

  d3.select(svgWrapper).on('mouseleave', object => {
    mouseleave(object, onUnhover)
  })

  return {
    removedTopPadding: topPadding,
    vis
  }
}

function mouseover(object, callback) {
  let childrenArray = getAllChildren(object)
  let ancestorArray = getAncestors(object)

  // Fade all the segments.
  paths.style('opacity', 0.5)

  // Highlight only those that are children of the current segment.
  paths.filter(node => childrenArray.indexOf(node) >= 0)
    .style('opacity', 1)

  let percentage = (100 * object.value / totalSize).toFixed(1)
  let percentageString = percentage + '%'
  if (percentage < 0.1) {
    percentageString = '< 0.1%'
  }

  callback({
    ancestorArray,
    name: object.data.name,
    size: object.value,
    percentage: percentageString
  })
}

function mouseleave(object, callback) {
  paths.style('opacity', 1)
  callback()
}