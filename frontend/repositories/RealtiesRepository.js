import BaseRepository from "./BaseRepository";

export default class RealtiesRepository extends BaseRepository {
  constructor(resource, $axios, currentUserResource) {
    super(resource, $axios);
    this.currentUserResource = currentUserResource;
  }

  addRealtyOwner(realtyId, ownerId) {
    return this.$axios.get(`${this.resource}/${realtyId}/owner/add/${ownerId}`)
  }
}
