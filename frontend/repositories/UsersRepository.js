import BaseRepository from "./BaseRepository";

export default class UsersRepository extends BaseRepository {
  constructor(resource, $axios) {
    super(resource, $axios);
  }
}
