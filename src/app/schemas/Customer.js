import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: String,
    address: String,
    status: {
        type: String,
        enum: ['Waiting for Service', 'In Service', 'Proposal Made', 'Not Concluded', 'Sold'],
        default: 'Waiting for Service'
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent'
    },
    saleValue: Number
}, {
    timestamps: true
});

export default mongoose.model('Customer', customerSchema);
