import Customer from "../schemas/Customer";
import Agent from "../schemas/Agente";

export const createCustomer = async (req, res) => {
  const customerSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: yup.string().nullable(),
    address: yup.string().nullable(),
    status: yup
      .string()
      .oneOf(
        [
          "Waiting for Service",
          "In Service",
          "Proposal Made",
          "Not Concluded",
          "Sold",
        ],
        "Invalid status"
      )
      .required("Status is required"),
  });

  try {
    await customerSchema.validate(req.body, { abortEarly: false });

    const nextAgent = await Agent.findOne({ status: "Active" }).sort({
      name: 1,
    });
    if (!nextAgent) {
      return res.status(404).json({ message: "No active agents available" });
    }

    const newCustomer = new Customer({
      ...req.body,
      agent: nextAgent._id,
    });

    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().populate("agent");
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate("agent");
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (customer) {
      res.status(200).json({ message: "Customer deleted successfully" });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Em CustomerController.js ou em um novo arquivo ReportController.js

export const getCustomersByStatus = async (req, res) => {
  try {
    const { status, agentId, startDate, endDate } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }
    if (agentId) {
      query.agent = agentId;
    }
    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const customers = await Customer.find(query).populate("agent");
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
