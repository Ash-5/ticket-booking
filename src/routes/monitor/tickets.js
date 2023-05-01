const express = require("express");
const router = express.Router();
const tickets = require("../../controllers/tickets/monitor/ticket");

router.get("/earning", tickets.monthlyEarning);
router.get("/visited", tickets.ticketSold);

module.exports = router;
