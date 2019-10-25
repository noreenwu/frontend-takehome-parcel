import React, { Component, Fragment } from 'react'

class Listing extends Component {

  render() {
    const { listItem, saveItem } = this.props

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
      <div className="result-container">
        <div className="grid-left">
          <button className={`btn btn-save`}

            >Save</button>
        </div>
        <div className="grid-right">
            <li key={listItem.sha}><div><span className="strong">{listItem.name}</span> by {listItem.authors} </div>
              <span className="description">{listItem.info}</span>
                <ul className="links">
                { links.map((uri) => (
                    <li key={uri.what}>{uri.what} {uri.url}</li>
                ))}
                </ul>
            </li>
        </div>
      </div>
    )
  }
}

// Listing.propTypes = {
//     listItem: PropTypes.object.isRequired,
//     saveItem: PropTypes.func.isRequired
// }

export default Listing
