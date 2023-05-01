const dotenv = require("dotenv");
const path = require("path");
const env = process.env.NODE_ENV || "development";
dotenv.config({
    path: path.join(__dirname, `./config/${env}.env`)
});
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require('sequelize');
const models = require("./models");
const admin_tickets = require("./routes/admin/tickets");
const monitor_tickets = require("./routes/monitor/tickets");
const logger = require("./services/logger");

models["movie"].hasMany(models["ticket"], {
    foreignKey: 'movieId'
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Routes
app.use("/admin/tickets", admin_tickets);
app.use("/monitor/tickets", monitor_tickets);

// Server
if (env === "development") {
    app.listen(process.env.HOST_PORT, () => {
        logger.info(`Server started at port:- ${process.env.HOST_PORT}`)
    })
}
