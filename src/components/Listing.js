import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

function Listing (props) {
  const { listItem } = props

  return (
    <Fragment>
      <li key={listItem.sha}><div><span className="strong">{listItem.name}</span> by {listItem.authors} </div>
        <span className="description">{listItem.info}</span>

      </li>
      <button className={`btn`}>Save</button>
    </Fragment>
  )
}

Listing.propTypes = {
    listItem: PropTypes.object.isRequired
}

export default Listing
