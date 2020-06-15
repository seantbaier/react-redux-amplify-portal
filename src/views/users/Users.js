/* eslint-disable react/prefer-stateless-function */
import React, { Component, Suspense } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  logout,
  resetCurrentSession,
  resetCurrentUser,
} from '../../store/actions/auth'
import {
  createUserAction,
  deleteUserAction,
  getUsersAction,
} from '../../store/actions/user'

class Users extends Component {
  componentDidMount = async () => {
    try {
      await this.getUsers()
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.log(ex)
    }
  }

  getUsers = async (params = {}) => {
    const {
      getUsers,
      users: {
        data: { params: oldParams },
      },
      listPageName,
    } = this.props

    const {
      limit: currentLimit = 10,
      skip: currentSkip = 0,
      sort: currentSort,
      filter: currentFilter,
    } = params

    let sort = oldParams && oldParams.sort ? oldParams.sort : {}
    let filter = oldParams && oldParams.filter ? oldParams.filter : {}

    let limit = oldParams && oldParams.limit ? oldParams.limit : 10
    let skip = oldParams && oldParams.skip ? oldParams.skip : 0

    if (
      params &&
      typeof currentLimit !== 'undefined' &&
      params &&
      typeof currentSkip !== 'undefined'
    ) {
      limit = currentLimit
      skip = currentSkip
    }

    if (params && typeof currentSort !== 'undefined') {
      sort = currentSort
    }

    if (params && typeof currentFilter !== 'undefined') {
      filter = currentFilter
    }

    try {
      await getUsers({
        limit,
        skip,
        filter,
        sort,
      })
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.log(ex)
    }
  }

  async createUser(userData) {
    const {
      createUser,
      users: {
        data: { params },
      },
    } = this.props

    await createUser(userData)
    await this.getUsers(params)
  }

  async deleteUser(id) {
    const { deleteUser, signOut, history } = this.props

    await deleteUser(id)

    if (this.isLoggedInUser(id)) {
      try {
        await signOut()
      } catch (err) {
        throw err
      }
    } else {
      await this.getUsers()
    }
  }

  isLoggedInUser(id) {
    const {
      currentUserAuth: { data: authUser },
    } = this.props

    return authUser.attributes['custom:externalId'] === id
  }

  render() {
    const {
      currentUser: { isFulfilled: isCurrentUserFulfilled },
      users: {
        isFulfilled,
        isRejected,
        data: { response, params },
        error,
      },
      listPageName,
    } = this.props

    const errMsg = `Error loading data: ${error}`

    return <div className="">Users</div>
  }
}

const mapStateToProps = (state) => ({
  currentUserAuth: state.auth.currentUser,
  currentUser: state.user.current,
  users: state.user.find,
})

const mapDispatchToProps = (dispatch) => ({
  getUsers: (params) => dispatch(getUsersAction(params)),
  createUser: (params) => dispatch(createUserAction(params)),
  deleteUser: (id) => dispatch(deleteUserAction(id)),
  signOut: () => {
    dispatch(resetCurrentUser())
    dispatch(resetCurrentSession())
    dispatch(logout())
  },
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Users)
