import React, { Component, Fragment } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

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
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
    )
  }
}

export default Routes
