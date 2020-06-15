import React, { Component, Fragment } from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'

// import components
import Users from './views/Users/Users'

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
                path="/users"
                render={(props) => {
                  return <Users match={props.match} history={props.history} />
                }}
              />
              <Route
                exact
                path="/"
                render={(props) => {
                  return <Redirect to="/users" />
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
