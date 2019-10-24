import React, { Component } from 'react'
import { get } from '../utils/SearchAPI'

class SearchInput extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      searchResult: []
    }
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
            size={80}
          />

          <button
            className={`btn btn-full`}
              type='submit'
              disabled={this.state.query === '' }>
              Submit
          </button>

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
                <h3>hello</h3>
                <ul>
                { this.state.searchResult.length === 0
                  ? <li key='other'>no result</li>
                  : this.state.searchResult.map((res) => (
                      <li key={res.sha}>{res.info} by {res.authors}</li>
                  ))
                }
                </ul>
        </div>
      </div>
    )
  }
}


export default SearchInput
