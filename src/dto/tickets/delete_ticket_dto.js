const deleteTicket = {
    token: String,
}

// validate the incoming data
const validateDeleteTicketRequest =  (ticket) => {
    const Joi = require('joi');

    const schema = Joi.object({
        token: Joi.string().required(),
    });

    return schema.validate(ticket);
}

exports.validateDeleteTicketRequest = validateDeleteTicketRequest;