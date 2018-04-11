import React from 'react'

let Breadcrumbs = props => (
  <div className="breadcrumbs">
    {props.nodes.map((node, i) => {
      let result = ' > '
      if (i === 0) {
        result = ''
      }
      return result + node.data.name
    })}
  </div>
)

export default Breadcrumbs