import React, { Component, Fragment } from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'

// import components
import Discrepancies from './views/Discrepancies/Discrepancies'

// import css and images

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <div className="app-wrapper">
            <Switch onUpdate={() => window.scrollTo(0, 0)}>
              <Route
                exact
                path="/discrepancies"
                render={(props) => {
                  return (
                    <Discrepancies
                      match={props.match}
                      history={props.history}
                    />
                  )
                }}
              />
              <Route
                exact
                path="/"
                render={(props) => {
                  return <Redirect to="/discrepancies" />
                }}
              />
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
    )
  }
}

export default Routes
