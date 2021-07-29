import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <CssBaseline />
      <Container disableGutters maxWidth={false}>
        <App />
      </Container>
    </Router>
  </Provider>,
  document.getElementById('root'))