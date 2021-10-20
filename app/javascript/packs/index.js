import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import reducers from '../reducers'
import App from '../components/App'
import thunk from 'redux-thunk'
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle'

const persistedState = loadState()
const store = createStore(reducers, persistedState, applyMiddleware(thunk))

store.subscribe(throttle(() => {
  saveState({
    teams: store.getState().teams,
    projects: store.getState().projects,
    tasks: store.getState().tasks,
    settings: store.getState().settings
  })
}, 1000))

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root'),
  )
})
