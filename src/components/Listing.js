import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

function Listing (props) {
  const { listItem } = props

  let links = []
  // assemble an array of non-null links to present
  if ( listItem.homepage_uri !== null ) {
     links.push({what: 'homepage_uri', url: listItem.homepage_uri})
  }
  if ( listItem.gem_uri !== null ) {
    links.push({what: 'gem_uri', url: listItem.gem_uri})
  }
  if ( listItem.wiki_uri !== null ) {
    links.push({what: 'wiki_uri', url: listItem.wiki_uri})
  }
  if ( listItem.source_code_uri !== null ) {
    links.push({what: 'source_code_uri', url: listItem.source_code_uri})
  }

  return (
    <Fragment>
      <li key={listItem.sha}><div><span className="strong">{listItem.name}</span> by {listItem.authors} </div>
        <span className="description">{listItem.info}</span>
          <ul className="links">
          { links.map((uri) => (
              <li key={uri.what}>{uri.what} {uri.url}</li>
          ))}
          </ul>
      </li>
      <button className={`btn`}>Save</button>
    </Fragment>
  )
}

Listing.propTypes = {
    listItem: PropTypes.object.isRequired
}

export default Listing
