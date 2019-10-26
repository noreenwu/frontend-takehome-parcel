import React from 'react'
import PropTypes from 'prop-types'
import Listing from './Listing'

const SearchResults = (props) => {

  const { searchResult, saveItem, unsaveItem, isSaved } = props

  return(

     <div className="search-results">
             <ul>
             { searchResult.length === 0
               ? <li key='other'>no result</li>
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


export default SearchResults
