import React, { Component } from 'react';
import createVisualization from '../createVisualization';

export default class extends Component {
  constructor() {
    super()
    this.createChart = this.createChart.bind(this)
  }

  componentDidMount() {
    if (this.props.data) {
      this.createChart(this.props.data);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.data && this.props.data !== prevProps.data) {
      this.createChart(this.props.data);
    }
  }

  createChart(root) {
    let details = createVisualization({
      svgElement: this.refs.svg,
      root,
      onHover: this.props.onHover,
      onUnhover: this.props.onUnhover
    });

    if (this.props.onRender) {
      this.props.onRender(details);
    }
  }

  render() {
    if (!this.props.data) {
      return null;
    }

    return <svg ref="svg" />;
  }
}
