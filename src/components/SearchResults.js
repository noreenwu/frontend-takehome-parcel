import React from 'react'
import PropTypes from 'prop-types'
import Listing from './Listing'

const SearchResults = (props) => {

  const { searchResult, saveItem, unsaveItem, isSaved } = props

  return(

     <div className="search-results">
             <ul>
             { searchResult.length === 0
               ? <li key='other'>There are no results.</li>
               : searchResult.map((res) => (

                     <Listing key={res.sha}
                              listItem={res}
                              saveItem={saveItem}
                              unsaveItem={unsaveItem}
                              alreadySaved={isSaved(res.sha)}/>

               ))
             }
             </ul>
     </div>
  )
}


SearchResults.propTypes = {
    searchResult: PropTypes.array.isRequired,
    saveItem: PropTypes.func.isRequired,
    unsaveItem: PropTypes.func.isRequired,
    isSaved: PropTypes.func.isRequired
}
export default SearchResults
