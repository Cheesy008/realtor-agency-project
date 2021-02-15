export default class BaseRepository {
  constructor(resource, $axios) {
    this.resource = resource;
    this.$axios = $axios;
  }

  all() {
    return this.$axios.get(`${this.resource}`)
  }

  retrieve(id) {
    return this.$axios.get(`${this.resource}/${id}`)
  }

  create(payload) {
    return this.$axios.post(`${this.resource}/create`, payload)
  }

  update(id, payload) {
    return this.$axios.post(`${this.resource}/${id}/edit`, payload)
  }

}
