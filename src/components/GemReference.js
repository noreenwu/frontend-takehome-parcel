import React from 'react'
import PropTypes from 'prop-types'

const GemReference = (props) => {
  const { target, url } = props
  let targetName = target.split('_')

  if (url === '') {
     return null
  }

  return (
    <div className="link-button"><a href={url} target={'blank'}>{targetName[0]}</a> </div>
  )
}

GemReference.propTypes = {
    target: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
}

export default GemReference
