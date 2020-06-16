import axios from 'axios'

export default (authEndpointUrl, publicEndpointUrl) => ({
  find: (params) => {
    let queryParams = Object.assign({}, params)
    if (params && params.filter) {
      queryParams = Object.assign(queryParams, params.filter)
      delete queryParams.filter

      if (queryParams.includeInactive === 'on') {
        queryParams.includeInactive = true
      }
    }

    if (params && params.sort) {
      queryParams = Object.assign(queryParams, {
        sort: Object.keys(params.sort)
          .map((key) => {
            return params.sort[key].toLowerCase() === 'desc' ? `-${key}` : key
          })
          .join(','),
      })
    }

    return axios
      .get(`${process.env.REACT_APP_API_URL}/users`)
      .then((response) => response)
  },
  findById: (id, includeInactive = false) =>
    axios
      .get(publicEndpointUrl(`users/${id}`), {
        params: { includeInactive },
      })
      .then((response) => response.data),
  create: (params) =>
    axios
      .post(authEndpointUrl('users'), params)
      .then((response) => response.data),
  update: (id, params) =>
    axios
      .put(authEndpointUrl(`users/${id}`), params)
      .then((response) => response.data),
  delete: (id) =>
    axios
      .patch(authEndpointUrl(`users/${id}`), { isActive: false })
      .then((response) => response.data),
  activate: (id) =>
    axios
      .patch(authEndpointUrl(`users/${id}?includeInactive=true`), {
        isActive: true,
      })
      .then((response) => response.data),
  invitation: (id) =>
    axios
      .post(authEndpointUrl(`users/${id}/invitations`))
      .then((response) => response.data),
})
