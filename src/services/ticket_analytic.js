const sequelize = require('sequelize');
const models = require("../models");
const { Op } = require("sequelize");
const ticket_status = require("../enums/ticket_status");


exports.monthlyProfit = async () => {
    const results = await models["ticket"].findAll({
        attributes: [
            [sequelize.fn('TO_CHAR', sequelize.fn('date_trunc', 'month', sequelize.col('startTime')), 'Month'), 'month'],
            'price'
        ],
        where: {
            status: {
                [Op.eq]: ticket_status.TicketStatus.ACTIVE
            }
        },
        raw: true
    });

    const revenue = results.reduce((tempResponse, { month, price }) => {
        const months = month.trim();
        
        tempResponse[months] = (tempResponse[months] || 0) + price;

        return tempResponse;
    }, {});

    return Object.entries(revenue).map(([month, monthlyEarning]) => {
        return {month , monthlyEarning}
    });
}

exports.monthlyVisit = async () => {
    const results = await models["ticket"].findAll({
        attributes: [
            [sequelize.fn('TO_CHAR', sequelize.fn('date_trunc', 'month', sequelize.col('startTime')), 'Month'), 'month'],
            'ticketId'
        ],
        where: {
            status: {
                [Op.eq]: ticket_status.TicketStatus.ACTIVE
            }
        },
        raw: true
    });

    const visits = results.reduce((temp_response, { month }) => {
        const trimmed_month = month.trim();

        temp_response[trimmed_month] = (temp_response[trimmed_month] || 0) + 1;

        return temp_response;
    }, {});

    return Object.entries(visits).map(([month, monthlyVisit]) => {
        return { month, monthlyVisit }
    })
}
