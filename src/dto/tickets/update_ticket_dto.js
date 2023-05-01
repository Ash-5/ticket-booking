const updateTicket = {
    token: String,
    seatNumber: Number
}

// validate the incoming data
const validateUpdateTicketRequest =  (ticket) => {
    const Joi = require('joi');

    const schema = Joi.object({
        token: Joi.string().required(),
        seatNumber: Joi.number().integer().required()
    });

    return schema.validate(ticket);
}

exports.validateUpdateTicketRequest = validateUpdateTicketRequest;