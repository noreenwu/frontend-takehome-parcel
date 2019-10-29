import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { DebounceInput } from 'react-debounce-input';
import { get } from '../utils/SearchAPI'
import { formatItem } from '../utils/helpers'
import SearchResults from './SearchResults'
import SavedView from './SavedView'
import { saveItemToStorage, getAllFromStorage, deleteItemFromStorage, paginate, MAX_SEARCH_RESULTS } from '../utils/helpers'

const SEARCH = 'search'
const SAVED = 'saved'

class Dashboard extends Component {

  componentDidMount() {
     // read in saved items from localstorage (utils)
     let savedItemsFromStorage = {}

     savedItemsFromStorage = getAllFromStorage()
     this.setState(() => ({
       savedItems: savedItemsFromStorage
     }))
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
  }

  showSearchResult(e) {
    e.preventDefault()
    ReactDOM.findDOMNode(this.inputElement).focus()

    if ( this.state.mode !== SEARCH ) {
      this.setState(() => ({
        mode: SEARCH
      }))
    }
  }

  showSaved(e) {
    e.preventDefault()

    this.setState(() => ({
      mode: SAVED
    }))
  }

  saveItem(item) {
      // add the item to the state.savedItems
      let newSavedItems = {}
      newSavedItems = Object.assign(newSavedItems, this.state.savedItems)
      newSavedItems[item.sha] = formatItem(item)

      this.setState(() => ({
        savedItems: newSavedItems
      }))

      // have it added to localstorage
      saveItemToStorage(item)

  }

  unsaveItem(id) {
      // remove item from the state.savedItems
      let newSavedItems = {}
      newSavedItems = Object.assign(newSavedItems, this.state.savedItems)
      delete newSavedItems[id]

      this.setState(() => ({
        savedItems: newSavedItems
      }))

      // have item removed from localstorage
      deleteItemFromStorage(id)
  }


  updateQuery(e) {
      e.preventDefault()
      const query = e.target.value

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
             let newResults = res.slice(0, MAX_SEARCH_RESULTS)
             this.setState({ searchResult: newResults })
          })
          .catch((err) => {
             console.log("search error", err)
          })
      }

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

    let findHighlight = ''
    let savedHighlight = ''

    if ( this.state.mode === SEARCH ) {
      findHighlight = 'highlight'
      savedHighlight = ''
    }
    else {
      findHighlight = ''
      savedHighlight = 'highlight'
    }

    return(
      <Fragment>
        <div className="dashboard">

          <div className="header">Find and Save RubyGems.</div>
          <form className="user-toggle-view">
            <button
               className={`btn btn-ctl ${findHighlight}`}
               type='submit'
               onClick={(event) => this.showSearchResult(event)}
               >
               Find Gems
            </button>
            <button
               className={`btn btn-ctl ${savedHighlight}`}
               type='submit'
               onClick={this.showSaved}
               >
               Saved Gems
            </button>

            <DebounceInput className='search-box'
                debounceTimeout={200}
                ref={input => this.inputElement = input}
                name="query"
                type="search"
                aria-label="Search for RubyGems by keyword"
                placeholder="Search for RubyGems by keyword..."
                value={this.state.query}
                onChange={(event) => this.updateQuery(event)}
                onFocus={this.showSearchResult}
                className={`text-area ${findHighlight}`}
                maxLength={100}
                size={60}
              />

          </form>
          </div>
          <div>
          { this.state.mode === SEARCH
            ?  <SearchResults searchResult={this.state.searchResult}
                              pageResult={paginate(this.state.searchResult)}
                              saveItem={this.saveItem}
                              unsaveItem={this.unsaveItem}
                              isSaved={this.isSaved}
                              query={this.state.query}
                    />
            :  <SavedView savedItems={this.state.savedItems}
                          saveItem={this.saveItem}
                          unsaveItem={this.unsaveItem}
                          isSaved={this.isSaved}
                          query={this.state.query}

                    />

          }

        </div>
      </Fragment>
    )
  }
}


export default Dashboard
