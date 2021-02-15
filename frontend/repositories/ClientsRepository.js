import BaseRepository from "./BaseRepository";

export default class ClientsRepository extends BaseRepository {
  constructor(resource, $axios) {
    super(resource, $axios);
  }

  uploadClientPhoto(id, photo) {
    return this.$axios.post(`${this.resource}/${id}/photo/upload`, photo, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  }

  getClientRealties(id) {
    return this.$axios.get(`${this.resource}/${id}/realties`)
  }
}
