import BaseRepository from "./BaseRepository";

export default class UsersRepository extends BaseRepository {
  constructor(resource, $axios, currentUserResource) {
    super(resource, $axios);
    this.currentUserResource = currentUserResource;
  }

  currentUser() {
    return this.$axios.get(`${this.currentUserResource}`)
  }

}
