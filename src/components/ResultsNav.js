import React from 'react'
import PropTypes from 'prop-types'

const ResultsNav = (props) => {
  return (
      <div className="nav-results">
        { props.currPage > 0
          ? <button
               className='btn-nav'
               onClick={(e) => {props.changePage(e, -1)}}
               >prev page</button>
          : null
        }
        <span className='nav-pagenum'>page {`${props.currPage + 1}`} of {props.numPages}</span>
         { props.currPage < props.numPages-1
          ? <button
               className='btn-nav'
               onClick={(e) => {props.changePage(e, 1)}}
               >next page</button>
          : null
        }
      </div>
  )
}

ResultsNav.propTypes = {
    currPage: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired,
    numPages: PropTypes.number.isRequired
}

export default ResultsNav
