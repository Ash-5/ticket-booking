const models = require("../../../models");
const validateTicket = require("../../../dto/tickets/create_ticket_dto");
const validateDeleteTicket = require("../../../dto/tickets/delete_ticket_dto");
const logger = require("../../../services/logger");
const { Op } = require("sequelize");
const validateUpdateTicket = require("../../../dto/tickets/update_ticket_dto");
const TicketStatus = require("../../../enums/ticket_status");

exports.getUserTickets = async (req, res) => {
    const token = req.body.token;
    if (token !== process.env.TOKEN) {
        return res.status(401).json({ message: 'Unauthorized user' });;
    }

    let ticketDetails = await models["ticket"].findOne({
        where: {
            userId: Number(req.params.id),
            status: TicketStatus.TicketStatus.ACTIVE,
            deletedAt: {
                [Op.not]: null
            }
        }
    });

    if (ticketDetails) {
        res.status(200).json(ticketDetails);
    } else {
        res.status(404).json({ error: 'ticket not found' });
    }
}

exports.createTickets = async (req, res) => {

    const token = req.body.token;
    if (token !== process.env.TOKEN) {
        res.status(401);
    }

    const request = req.body;

    const { error } = validateTicket.validateNewTicketRequest(request);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const { movieId, userId, seatNumber, price, status, startTime, endTime } = req.body;
        const ticket = await models["ticket"].create({
            movieId,
            userId,
            seatNumber,
            price,
            status,
            startTime,
            endTime
        });

        return res.status(201).json(ticket);
    } catch (error) {
        logger.error(error.message);
        return res.status(400).json({ error: error.message });
    }
}

exports.updateTickets = async (req, res) => {
    const token = req.body.token;
    if (token !== process.env.TOKEN) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }

    const request = req.body;

    const { error } = validateUpdateTicket.validateUpdateTicketRequest(request);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const ticketId = Number(req.params.id);

    await models["ticket"].update({
            seatNumber: Number(request.seatNumber),
            updateAt: new Date()
        },
        {
            where: {
                ticketId: ticketId
            }
        }).then((result) => {
            const affectedRow = result[0];

            if (affectedRow > 0) {
                logger.info(`Updated ticket id ${ticketId}`);
                return res.status(204);
            } else {
                logger.info(`No active ticket found for ticket id:- ${ticketId}`);
                return 
            }
        }).catch((error) => {
            logger.error(`Error while updating ${error.message}`);
            return res.status(400);
        });
}

exports.deleteTickets = async (req, res) => {
    const token = req.body.token;
    if (token !== process.env.TOKEN) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }

    const request = req.body;

    const { error } = validateDeleteTicket.validateDeleteTicketRequest(request);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const ticketId = Number(req.params.id);

    await models["ticket"].update({
            status: Number(TicketStatus.TicketStatus.INACTIVE),
            deletedAt: new Date()
        },
        {
            where: {
                ticketId: ticketId,
                status: Number(TicketStatus.TicketStatus.ACTIVE)
            }
        }).then((result) => {
            const affectedRow = result[0];
            if (affectedRow > 0) {
                logger.info(`Deleted ticket:- ${ticketId}`);
                return res.status(204);
            } else {
                logger.error(`No active ticket found ${ticketId}`);
            }
        }).catch((error) => {
            logger.error(`${error.message} while deleting ${ticketId}`);
            return res.status(400);
        });
}