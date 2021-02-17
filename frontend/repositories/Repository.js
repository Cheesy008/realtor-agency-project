import ClientsRepository from "./ClientsRepository";
import UsersRepository from "./UsersRepository";

export default $axios => ({
  clients: new ClientsRepository('clients', $axios),
  users: new UsersRepository('Users', $axios, 'Auth/user'),
})

