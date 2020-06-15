import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Badge } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { TableHeaderColumn } from 'react-bootstrap-table'
import { get } from 'lodash'

import EntityFilter from '../General/EntityFilter'
import UserEditModal from './UserEditModal'
import { getAuthenticatedUser } from '../../store/actions/auth'
import {
  userHasPermission,
  isMember,
  isUser,
  isAdmin,
} from '../../utilities/user-util'
import { LIMIT } from '../../utilities/api-params'

const DataTable = React.lazy(() => import('../Tables/DataTable/DataTable'))

class UserTable extends Component {
  render() {
    const {
      response,
      params = {},
      getUsers,
      createUser,
      deleteUser,
      listPageName,
    } = this.props

    const { data = [], totalItems = 0, currentPage = 0 } = response || {}
    const role = get(this.props, 'currentUser.data.role', '')
    const hasPermission = userHasPermission(role)
    const isMemberPage = isMember(listPageName)
    const isUserPage = isUser(listPageName)
    const isAdminPage = isAdmin(listPageName)

    const filterForm = this.getFilterForm()

    const filter = hasPermission && (
      <EntityFilter
        getEntities={(paramData) => {
          getUsers(paramData)
        }}
        currentFilters={params && params.filter ? params.filter : {}}
        filterForm={filterForm}
      />
    )

    const create =
      hasPermission && createUser ? (
        <UserEditModal
          listPageName={listPageName}
          user={{}}
          onSubmit={createUser}
        />
      ) : null

    const tableData = []
    data.forEach((item) => {
      const { address } = item
      const { city, state } = address || {}

      const newItem = {
        ...item,
        city,
        state,
      }

      tableData.push(newItem)
    })

    return (
      <div>
        <DataTable
          tableType="entity-list"
          tableData={tableData}
          tableHeader={listPageName}
          hover
          bordered
          striped
          responsive
          size="sm"
          search={false}
          filter={filter}
          dataTotalSize={totalItems}
          pagination={hasPermission}
          paginationOptions={{
            changePage: this.changePage,
            sizePerPage:
              params && typeof params.limit !== 'undefined'
                ? params.limit
                : LIMIT,
            page: currentPage,
          }}
          sortOptions={{
            updateSort: this.updateSort,
            sortValue: params.sort,
          }}
          createEntityModalButton={create}
          iconHeader="icon-people"
        >
          <TableHeaderColumn dataField="id" isKey hidden>
            Id
          </TableHeaderColumn>

          {(isMemberPage || isAdminPage) && (
            <TableHeaderColumn
              tdStyle={{ minWidth: '150px', maxWidth: '275px' }}
              dataFormat={this.linkFormat}
              dataField="email"
              isKey={false}
              dataSort
            >
              Email
            </TableHeaderColumn>
          )}

          {!isAdminPage && (
            <TableHeaderColumn
              dataFormat={this.linkFormat}
              dataField="taxId"
              isKey={false}
              dataSort
            >
              Tax ID
            </TableHeaderColumn>
          )}

          {isUserPage && (
            <TableHeaderColumn
              tdStyle={{ minWidth: '150px', maxWidth: '275px' }}
              dataFormat={this.linkFormat}
              dataField="email"
              isKey={false}
              dataSort
            >
              Email
            </TableHeaderColumn>
          )}

          <TableHeaderColumn
            tdStyle={{ minWidth: '150px', maxWidth: '275px' }}
            dataField="firstName"
            isKey={false}
            dataSort
          >
            First Name
          </TableHeaderColumn>

          <TableHeaderColumn
            tdStyle={{ minWidth: '150px', maxWidth: '275px' }}
            dataField="lastName"
            isKey={false}
            dataSort
          >
            Last Name
          </TableHeaderColumn>

          <TableHeaderColumn dataField="phoneNumber" isKey={false}>
            Phone Number
          </TableHeaderColumn>

          {isUserPage && (
            <TableHeaderColumn dataField="role" isKey={false} dataSort>
              Role
            </TableHeaderColumn>
          )}

          {(isMemberPage || isAdminPage) && (
            <TableHeaderColumn dataField="city" isKey={false} dataSort>
              City
            </TableHeaderColumn>
          )}

          {(isMemberPage || isAdminPage) && (
            <TableHeaderColumn dataField="state" isKey={false} dataSort>
              State
            </TableHeaderColumn>
          )}

          {!!deleteUser && (
            <TableHeaderColumn
              dataField="id"
              isKey={false}
              dataFormat={this.getFormat}
              width="75px"
              dataAlign="center"
            >
              &nbsp;
            </TableHeaderColumn>
          )}
        </DataTable>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentAuthUser: state.auth.currentUser.data,
  currentUser: state.user.current.data,
})

const mapDispatchToProps = (dispatch) => ({
  getAuthUser: () => dispatch(getAuthenticatedUser()),
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(UserTable)
