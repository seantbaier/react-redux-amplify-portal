import axios from 'axios'

export default () => ({
  find: (params) => {
    // let queryParams = Object.assign({}, params)
    // if (params && params.filter) {
    //   queryParams = Object.assign(queryParams, params.filter)
    //   delete queryParams.filter
    // }

    // if (params && params.sort) {
    //   queryParams = Object.assign(queryParams, {
    //     sort: Object.keys(params.sort)
    //       .map((key) => {
    //         return params.sort[key].toLowerCase() === 'desc' ? `-${key}` : key
    //       })
    //       .join(','),
    //   })
    // }

    return axios
      .get(`${process.env.REACT_APP_API_URL}/discrepancies`)
      .then((response) => {
        console.log('response: ', response)
        return response
      })
  },
  findById: (id) =>
    axios.get(`/discrepancies/${id}`).then((response) => response.data),
  create: (params) =>
    axios.post('/discrepancies', params).then((response) => response.data),
  update: (id, params) =>
    axios.put(`/discrepancies/${id}`, params).then((response) => response.data),
  delete: (id) =>
    axios.patch(`/discrepancies/${id}`).then((response) => response.data),
})
