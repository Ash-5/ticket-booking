const models = require("../../../models");
const logger = require("../../../services/logger");
const sequelize = require('sequelize');
const { Op } = require("sequelize");
const TicketStatus = require("../../../enums/ticket_status");
const ticket_service = require("../../../services/ticket_analytic")


exports.monthlyEarning = async (req, res) => {
    const token = req.body.token;
    if (token !== process.env.TOKEN) {
        return res.status(401).json({ message: 'Unauthorized user' });;
    }

    const analyticMethod = req.query.method;

    try {
        if (analyticMethod === 'db-aggregation') {
            await models["ticket"].findAll({
                attributes: [
                    [sequelize.fn('TRIM', sequelize.fn('TO_CHAR', sequelize.fn('date_trunc', 'month', sequelize.col('startTime')), 'Month')), 'month'],
                    [sequelize.fn('sum', sequelize.col('price')), 'summaryProfit']
                ],
                where: {
                    status: {
                        [Op.eq]: TicketStatus.TicketStatus.ACTIVE
                    }
                },
                group: ['month'],
                raw: true
            })
            .then((results) => {
                return res.status(200).json(results);
            })
        } else if (analyticMethod === 'js-algo') {
            const result = await ticket_service.monthlyProfit();
            return res.status(200).json(result);
        } else {
            res.status(400).json({ message: 'Please check query param' })
        }
    } catch (error) {
        logger.error(error.message);
        return res.status(400).json({ message: error.message });
    }
    

}

exports.ticketSold = async (req, res) => {
    const token = req.body.token;

    if (token !== process.env.TOKEN) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }

    const analyticMethod = req.query.method;

    try {
        if (analyticMethod === 'db-aggregation') {

            await models["ticket"].findAll({
                attributes: [
                  [sequelize.fn('TRIM', sequelize.fn('TO_CHAR', sequelize.fn('date_trunc', 'month', sequelize.col('startTime')), 'Month')), 'month'],
                  [sequelize.fn('COUNT', sequelize.col('ticketId')), 'monthlyVisit']
                ],
                where: {
                  status: {
                    [Op.eq]: TicketStatus.TicketStatus.ACTIVE
                  }
                },
                group: ['month']
              })
              .then((result) => {
                return res.status(200).json(result);
              })
              .catch((error) => {
                console.log(error.message);
              });

        } else if (analyticMethod === 'js-algo') {
            const result = await ticket_service.monthlyVisit();
            return res.status(200).json(result);
        } else {
            res.status(400).json({ message: 'Please check query param' });
        }
    } catch (error) {

    }
}
