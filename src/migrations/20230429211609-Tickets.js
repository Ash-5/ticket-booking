'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'tickets', {
        ticketId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        movieId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        seatNumber: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        startTime: {
          type: DataTypes.DATE,
          allowNull: false
        },
        endTime: {
          type: DataTypes.DATE,
          allowNull: false
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal('NOW()'),
          allowNull: false
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true
        }
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("tickets");
  }
};
