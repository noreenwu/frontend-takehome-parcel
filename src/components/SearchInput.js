import React, { Component } from 'react'
import { get } from '../utils/SearchAPI'

class SearchInput extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      searchResult: ['a', 'b', 'c']
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
      console.log("handleChange")
      this.setState({
        [e.target.name]: e.target.value
      })

      let query = e.target.value

      if (query !== '') {
        get(query)
          .then(console.log("got results"))
          .catch((err) => {
             console.log("search error", err)
          })
      }
      // this.setState ({
      //   searchResult : ['a', 'b']
      // })
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
             let newResults = res
             console.log("res", res, res.length)
             // this.setState({ searchResult: newResults })
          })
          .catch((err) => {
             console.log("search error", err)
          })
      }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("form submit")
    let query = 'wiki'
    console.log('target', e.target)
    get(query)

  }

  render() {
    console.log("query is ", this.state.query)
    return(
      <div>
        <form className='search-box' onSubmit={this.handleSubmit}>
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
                <div>{this.state.searchResult[0]}</div>
                { this.state.searchResult.length === 0
                  ? <li key='1'>no result</li>
                  : this.state.searchResult.map((id) => (
                      <li key={id}>something</li>
                  ))
                }
        </div>
      </div>
    )
  }
}


export default SearchInput
