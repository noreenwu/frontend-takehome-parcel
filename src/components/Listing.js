import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class Listing extends Component {

  handleChange(e, saveItem, unsaveItem, item, alreadySaved) {
    e.preventDefault()

    if ( alreadySaved ) {
      unsaveItem(item.sha)
    }
    else {
      saveItem(item)
    }
  }

  printByline(author) {
      if (author === '') {
        return
      }
      else {
        return `by ${author}`
      }
  }

  render() {
    const { listItem, saveItem, unsaveItem, alreadySaved } = this.props

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
      <form onSubmit={(event) => this.handleChange(event, saveItem, unsaveItem, listItem, alreadySaved)}>
          <div className="result-container">
            <div className="grid-left">
              { alreadySaved === true
                ?  <button className={`sbtn btn-unsave`}
                           type='submit'
                   >Unsave</button>
                :  <button className={`sbtn btn-save`}
                           type='submit'
                   >Save</button>
              }

            </div>
            <div className="grid-right">
                <li key={listItem.sha}>
                  <div><span className="strong">
                      {listItem.name}</span> { this.printByline(listItem.authors) }
                  </div>
                  <span className="description">{listItem.info}</span>
                    <ul className="links">
                    { links.map((uri) => (
                        <li key={uri.what}>{uri.what} {uri.url}</li>
                    ))}
                    </ul>
                </li>
            </div>
          </div>
      </form>
    )
  }
}

Listing.propTypes = {
    listItem: PropTypes.object.isRequired,
    saveItem: PropTypes.func.isRequired,
    alreadySaved: PropTypes.bool.isRequired
}

export default Listing
