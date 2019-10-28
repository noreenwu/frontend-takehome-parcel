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

    if (this.props.pageResult !== prevProps.pageResult) {
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

    const { searchResult, pageResult, saveItem, unsaveItem, isSaved } = this.props
    console.log("pageResult", pageResult)


    if (pageResult[0] === undefined) {
       return <div>There are no results.</div>
    }

    console.log("pageResult first item of first page", pageResult[0][0].sha)
    let numPages = pageResult.length
    console.log("number of pages ", numPages)
    let pageIdx = this.state.currPage
    console.log("pageIdx is ", pageIdx)
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
    isSaved: PropTypes.func.isRequired
}
export default SearchResults
