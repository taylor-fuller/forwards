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
    teams_led: store.getState().teams_led,
    projects: store.getState().projects,
    projects_led: store.getState().projects_led,
    tasks: store.getState().tasks,
    UI: {
      activeWorkspace: store.getState().UI.activeWorkspace,
      activeSidebarOption: store.getState().UI.activeSidebarOption,
      activeProject: store.getState().UI.activeProject,
      activeTask: store.getState().UI.activeTask,
      initialLoad: store.getState().UI.initialLoad
    }
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
