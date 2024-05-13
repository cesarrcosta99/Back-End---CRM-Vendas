import { Router } from "express";
import {
  createAgent,
  getAllAgents,
  getAgentById,
  updateAgent,
  deleteAgent,
} from "./app/controllers/AgentController.js";
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomersByStatus
} from "./app/controllers/CustomerController.js";

const routes = new Router();

// Rotas para Agentes
routes.post("/api/agents", createAgent);
routes.get("/api/agents", getAllAgents);
routes.get("/api/agents/:id", getAgentById);
routes.put("/api/agents/:id", updateAgent);
routes.delete("/api/agents/:id", deleteAgent);

// Rotas para Clientes
routes.post("/api/customers", createCustomer);
routes.get("/api/customers", getAllCustomers);
routes.get("/api/customers/:id", getCustomerById);
routes.put("/api/customers/:id", updateCustomer);
routes.delete("/api/customers/:id", deleteCustomer);

routes.get("/api/customers/reports/status", getCustomersByStatus);

export default routes;
