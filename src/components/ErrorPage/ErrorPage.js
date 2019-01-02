import React from 'react'
import { catchError } from '../../actions/index'
import { connect } from 'react-redux'

export const ErrorPage = ({returnToSite}) => {

  return (
    <div className='error-page-container'>
      <h1>OOPS!</h1>
      <h2>An unexpected error occurred...</h2>
      <button className='return-to-site-btn' onClick={() => returnToSite()}>Return to Site</button>
    </div>
  )
}

export const mapDispatchToProps = (dispatch) => ({
  returnToSite: () => dispatch(catchError(false))
})

export default connect(null, mapDispatchToProps)(ErrorPage)