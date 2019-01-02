import React from 'react'

const Loading = () => {
  return (
    <div>
      <div className="loading-container">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
        <p className="loading">Loading</p>
    </div>
  )
}

export default Loading