import ClientsRepository from "./ClientsRepository";
import UsersRepository from "./UsersRepository";
import RealtiesRepository from "./RealtiesRepository";

export default $axios => ({
  clients: new ClientsRepository('clients', $axios),
  users: new UsersRepository('Users', $axios, 'Auth/user'),
  realties: new RealtiesRepository('realties', $axios),
})

