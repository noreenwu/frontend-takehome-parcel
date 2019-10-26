import React from 'react'
import PropTypes from 'prop-types'
import SearchResults from './SearchResults'

const SavedView = (props) => {

  const { savedItems, saveItem, unsaveItem, isSaved } = props

  let searchResult = Object.values(savedItems)

  return(
    <SearchResults searchResult={searchResult}
                      saveItem={saveItem}
                      unsaveItem={unsaveItem}
                      isSaved={isSaved}
            />
  )

}

SavedView.propTypes = {
    savedItems: PropTypes.object.isRequired,
    saveItem: PropTypes.func.isRequired,
    unsaveItem: PropTypes.func.isRequired,
    isSaved: PropTypes.func.isRequired
}
export default SavedView
