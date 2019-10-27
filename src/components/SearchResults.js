import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Listing from './Listing'
import { paginate } from '../utils/helpers'

class SearchResults extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currPage: 0,
      prev: false,
      next: false,
    }

    this.changePage = this.changePage.bind(this)
  }


  changePage(e, incr) {
    let nextP = this.state.currPage + incr

    this.setState(() => ({
      currPage: nextP
    }))
  }

  render() {

    const { searchResult, pageResult, saveItem, unsaveItem, isSaved } = this.props


    if (pageResult[0] === undefined) {
       return null
    }

    let numPages = pageResult.length
    console.log("number of pages ", numPages)
    let pageIdx = this.state.currPage
    console.log("pageIdx is ", pageIdx)
    return(
       <Fragment>
         <div className="search-results">
                 <ul>
                 { pageResult[pageIdx].length === 0
                   ? <li key='other'>There are no results.</li>
                   : pageResult[pageIdx].map((res) => (

                         <Listing key={res.sha}
                                  listItem={res}
                                  saveItem={saveItem}
                                  unsaveItem={unsaveItem}
                                  alreadySaved={isSaved(res.sha)}/>

                   ))
                 }
                 </ul>
         </div>
         <div className="nav-results">
           { this.state.currPage > 0
             ? <button
                  className='btn'
                  onClick={(e) => {this.changePage(e, -1)}}
                  >prev page</button>
             : null
           }
           <span className='nav-pagenum'>page {`${pageIdx + 1}`} of {numPages}</span>
           { pageIdx < numPages-1
             ? <button
                  className='btn'
                  onClick={(e) => {this.changePage(e, 1)}}
                  >next page</button>
             : null
           }
         </div>
       </Fragment>
    )
  }
}


SearchResults.propTypes = {
    searchResult: PropTypes.array.isRequired,
    saveItem: PropTypes.func.isRequired,
    unsaveItem: PropTypes.func.isRequired,
    isSaved: PropTypes.func.isRequired
}
export default SearchResults
