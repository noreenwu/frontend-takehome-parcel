import React from 'react'
import PropTypes from 'prop-types'
import SearchResults from './SearchResults'
import { paginate } from '../utils/helpers'

const SavedView = (props) => {

  const { savedItems, saveItem, unsaveItem, isSaved, query } = props

  // get savedItems in form that SearchResults can use
  let searchResult = Object.values(savedItems)

  return(
    <SearchResults searchResult={searchResult}
                   pageResult={paginate(searchResult)}
                   saveItem={saveItem}
                   unsaveItem={unsaveItem}
                   isSaved={isSaved}
                   query={query}
                   message="You don't have anything saved."
            />
  )

}

SavedView.propTypes = {
    savedItems: PropTypes.object.isRequired,
    saveItem: PropTypes.func.isRequired,
    unsaveItem: PropTypes.func.isRequired,
    isSaved: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired
}
export default SavedView
