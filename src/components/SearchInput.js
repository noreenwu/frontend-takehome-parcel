import React, { Component } from 'react'
import { get } from '../utils/SearchAPI'

class SearchInput extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("form submit")
    let query = 'wiki'
    console.log('target', e.target)
    get(query)

  }

  render() {
    return(
      <div>
        <form className='search-box' onSubmit={this.handleSubmit}>
        <input
            name="query"
            type="text"
            placeholder="your search terms"
            value={this.state.query}
            onChange={this.handleChange}
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
      </div>
    )
  }
}


export default SearchInput
