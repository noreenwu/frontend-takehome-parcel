import React, { Component, Fragment } from 'react'
import { get } from '../utils/SearchAPI'
import { formatItem } from '../utils/helpers'
import Listing from './Listing'

class SearchInput extends Component {
  componentDidMount() {
     // read in saved items from localstorage (utils)

  }

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      searchResult: [],
      savedItems: []
    }
  }

  saveItem(item) {
      // add the item to the state.savedItems
      const newSavedItems = this.state.savedItems.slice()
      newSavedItems.push(formatItem(item))
      this.setState(() => ({
        savedItems: newSavedItems
      }))

      // have it added to localstorage (utils)


  }

  deleteItem() {
      // remove item from the state.savedItems

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


  render() {
    console.log("query is ", this.state.query)
    return(
      <div>
        <form className='search-box'>
        <input
            name="query"
            type="text"
            placeholder="Search for gems by keyword"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
            className='text-area'
            maxLength={100}
            size={60}
          />

        </form>
        <form>
          <button>
            Clear
          </button>
        </form>
        <form>
        <button
           className={`btn btn-full`}
           type='submit'
           >
           View Saved
        </button>

        </form>

        <div className="search-results">
                <ul>
                { this.state.searchResult.length === 0
                  ? <li key='other'>no result</li>
                  : this.state.searchResult.map((res) => (

                        <Listing key={res.sha} listItem={res} saveItem={this.saveItem}/>

                  ))
                }
                </ul>
        </div>
      </div>
    )
  }
}


export default SearchInput
