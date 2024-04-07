import Helmet  from "react-helmet";
import React from 'react'
//whatever component we use title will change
const MetaData = ({title}) => {
  return (
    <Helmet>
        <title>{title}</title>
    </Helmet>
  )
}

export default MetaData