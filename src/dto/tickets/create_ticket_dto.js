const ticketDTO = {
    token: String,
    movieId: Number,
    userId: Number,
    seatNumber: Number,
    price: Number,
    status: Number,
    startTime: Date,
    endTime: Date
}

// validate the incoming data
const validateNewTicketRequest =  (ticket) => {
    const Joi = require('joi');

    const schema = Joi.object({
        token: Joi.string().required(),
        movieId: Joi.number().integer().required(),
        userId: Joi.number().integer().required(),
        seatNumber: Joi.number().integer().required(),
        price: Joi.number().integer().required(),
        status: Joi.number().integer().required(),
        startTime: Joi.date().required(),
        endTime: Joi.date().required()
    });

    return schema.validate(ticket);
}

exports.validateNewTicketRequest = validateNewTicketRequest;