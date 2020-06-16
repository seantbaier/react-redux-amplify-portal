/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  logout,
  resetCurrentSession,
  resetCurrentUser,
} from '../../store/actions/auth'

import { getDiscrepanciesAction } from '../../store/actions/discrepancy'

import DefaultLayout from '../../components/DefaultLayout/DefaultLayout'

class Discrepancies extends Component {
  componentDidMount = async () => {
    try {
      await this.getDiscrepancies()
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.log(ex)
    }
  }

  getDiscrepancies = async (params = {}) => {
    const {
      getDiscrepancies,
      discrepancies: {
        data: { params: oldParams },
      },
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
      await getDiscrepancies({
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

  isLoggedInUser(id) {
    const {
      currentUserAuth: { data: authUser },
    } = this.props

    return authUser.attributes['custom:externalId'] === id
  }

  render() {
    // Get users
    return (
      <DefaultLayout>
        <div className="">Discrepancies</div>
      </DefaultLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  discrepancies: state.discrepancy.find,
})

const mapDispatchToProps = (dispatch) => ({
  getDiscrepancies: (params) => dispatch(getDiscrepanciesAction(params)),
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Discrepancies)
