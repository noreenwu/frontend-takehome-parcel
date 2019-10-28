import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Listing from './Listing'
import ResultsNav from './ResultsNav'
import { paginate } from '../utils/helpers'

class SearchResults extends Component {


  constructor(props) {
    super(props)

    this.state = {
      currPage: 0
    }
  }

  componentDidUpdate(prevProps) {

    if (this.props.searchResult !== prevProps.searchResult) {
      this.setState(() => ({
        currPage: 0
      }))
    }
  }


  changePage = (e, incr) => {
    e.preventDefault()
    let nextP = this.state.currPage + incr

    this.setState(() => ({
      currPage: nextP
    }))
  }

  render() {

    const { searchResult, pageResult, saveItem, unsaveItem, isSaved, query, message } = this.props


    if (pageResult[0] === undefined) {
       if ( message !== undefined ) {
         return <div className="error-msg">{ message }</div>
       }
       else {
         if (query === '') {
           return <div className="error-msg">Enter a keyword in the field above.</div>
         }
         else {
           return <div className="error-msg">There are no results. Try something else?</div>
         }
       }
    }

    let numPages = pageResult.length
    console.log("SearchResults: numpages ", numPages)
    let pageIdx = this.state.currPage

    return(
       <Fragment>


         <div className="search-results">
                 <ul>
                 {  pageResult[pageIdx].map((res) => (

                         <Listing key={res.sha}
                                  listItem={res}
                                  saveItem={saveItem}
                                  unsaveItem={unsaveItem}
                                  alreadySaved={isSaved(res.sha)}/>

                   ))
                 }
                 </ul>

                 <ResultsNav
                     currPage={this.state.currPage}
                     changePage={this.changePage}
                     numPages={numPages}
                 />

         </div>

       </Fragment>
    )
  }
}


SearchResults.propTypes = {
    searchResult: PropTypes.array.isRequired,
    pageResult: PropTypes.array.isRequired,
    saveItem: PropTypes.func.isRequired,
    unsaveItem: PropTypes.func.isRequired,
    isSaved: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
    message: PropTypes.string   // not required
}
export default SearchResults
