import React, { Component, Fragment } from 'react'
import { get } from '../utils/SearchAPI'
import { formatItem } from '../utils/helpers'
// import Listing from './Listing'
import SearchResults from './SearchResults'
import SavedView from './SavedView'

const SEARCH = 'search'
const SAVED = 'saved'

class SearchInput extends Component {

  componentDidMount() {
     // read in saved items from localstorage (utils)

  }


  constructor(props) {
    super(props)
    this.state = {
      query: '',
      searchResult: [],
      savedItems: {},
      mode: SEARCH
    }
    this.saveItem = this.saveItem.bind(this)
    this.unsaveItem = this.unsaveItem.bind(this)
    this.isSaved = this.isSaved.bind(this)
    this.showSearchResult = this.showSearchResult.bind(this)
    this.showSaved = this.showSaved.bind(this)
    this.clearQuery = this.clearQuery.bind(this)
  }

  showSearchResult(e) {
    if (e != undefined) {
      e.preventDefault()
    }
    console.log("show search result")
    this.setState(() => ({
      mode: SEARCH
    }))
  }

  showSaved(e) {
    e.preventDefault()
    console.log("show saved")
    this.setState(() => ({
      mode: SAVED
    }))
  }

  saveItem(item) {

      // add the item to the state.savedItems
      let newSavedItems = {}
      newSavedItems = Object.assign(newSavedItems, this.state.savedItems)
      newSavedItems[item.sha] = formatItem(item)
      console.log("new saved items ", newSavedItems)
      console.log(" saved items values ", Object.values(newSavedItems))
      console.log(" search result ", this.state.searchResult)
      this.setState(() => ({
        savedItems: newSavedItems
      }))

      // have it added to localstorage (utils)

  }

  unsaveItem(id) {
      // remove item from the state.savedItems
      let newSavedItems = {}
      newSavedItems = Object.assign(newSavedItems, this.state.savedItems)
      delete newSavedItems[id]
      console.log("new saved items after deletion ", newSavedItems)

      this.setState(() => ({
        savedItems: newSavedItems
      }))

      // have it removed from localstorage (utils)

  }


  updateQuery(query) {
      this.setState(() => ({
        query: query
      }))

      if (query === '') {
        this.setState({
          searchResult : [],
        })
      }
      else {
        get(query.toLowerCase())
          .then((res) => {
             let newResults = res.slice(0, 12)
             console.log("res", newResults, newResults.length)
             this.setState({ searchResult: newResults })

          })
          .catch((err) => {
             console.log("search error", err)
          })
      }
  }

  clearQuery(e) {
    e.preventDefault()
    this.setState(() => ({
      query: '',
      searchResult: []
    }))
  }

  isSaved(id) {

      if ( id in this.state.savedItems ) {
         return true
      }
      else {
         return false
      }
  }

  render() {
    // console.log("query is ", this.state.query)
    return(
      <div>
        <form className='search-box'>
        <input
            name="query"
            type="text"
            placeholder="Search for gems by keyword"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
            onFocus={this.showSearchResult}
            className='text-area'
            maxLength={100}
            size={60}
          />

        </form>
        <form>
          <button
            className={`btn btn-full`}
            type='submit'
            onClick={this.clearQuery}
          >
            Clear
          </button>
        </form>
        <form>
        <button
           className={`btn btn-full`}
           type='submit'
           onClick={this.showSearchResult}
           >
           Search
        </button>
        <button
           className={`btn btn-full`}
           type='submit'
           onClick={this.showSaved}
           >
           View Saved
        </button>

        </form>

        { this.state.mode === SEARCH
          ?  <SearchResults searchResult={this.state.searchResult}
                            saveItem={this.saveItem}
                            unsaveItem={this.unsaveItem}
                            isSaved={this.isSaved}
                  />
          :  <SavedView savedItems={this.state.savedItems}
                        saveItem={this.saveItem}
                        unsaveItem={this.unsaveItem}
                        isSaved={this.isSaved}

                  />

        }

      </div>
    )
  }
}


export default SearchInput
