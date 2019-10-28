import React from 'react'
import PropTypes from 'prop-types'

const GemReference = (props) => {
  const { target, url, listItem } = props
  let targetName = target.split('_')

  if (url === '') {
     return null
  }

  return (
    <div className="link-button"><a aria-label={`${listItem.name} ${targetName[0]}`}
                                    href={url} target={'blank'}>{targetName[0]}</a> </div>
  )
}

GemReference.propTypes = {
    target: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    listItem: PropTypes.object.isRequired,
}

export default GemReference
