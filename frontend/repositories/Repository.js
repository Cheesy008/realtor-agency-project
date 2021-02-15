import ClientsRepository from "./ClientsRepository";

export default $axios => ({
  clients: new ClientsRepository('clients', $axios)
})

