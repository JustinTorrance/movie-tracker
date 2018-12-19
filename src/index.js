import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import AppContainer from './containers/AppContainer'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import rootReducer from './reducers/index'
import { Provider } from 'react-redux'


const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(rootReducer, devTools)



ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter> 
  </Provider>,

  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
