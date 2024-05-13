// app/controllers/AgentController.js
import Agent from "../schemas/Agente.js";

export const createAgent = async (req, res) => {
    try {
        const agent = new Agent(req.body);
        await agent.save();
        res.status(201).json(agent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllAgents = async (req, res) => {
    try {
        const agents = await Agent.find();
        res.status(200).json(agents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAgentById = async (req, res) => {
    try {
        const agent = await Agent.findById(req.params.id);
        if (agent) {
            res.status(200).json(agent);
        } else {
            res.status(404).json({ message: 'Agent not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAgent = async (req, res) => {
    try {
        const updatedAgent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedAgent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteAgent = async (req, res) => {
    try {
        const agent = await Agent.findByIdAndDelete(req.params.id);
        if (agent) {
            res.status(200).json({ message: 'Agent deleted successfully' });
        } else {
            res.status(404).json({ message: 'Agent not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
