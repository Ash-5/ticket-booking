const express = require("express");
const router = express.Router();
const tickets = require("../../controllers/tickets/admin/tickets");

router.get("/:id", tickets.getUserTickets);
router.post("/", tickets.createTickets);
router.patch("/:id", tickets.updateTickets);
router.delete('/:id', tickets.deleteTickets);

module.exports = router;