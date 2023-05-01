const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Movie = sequelize.define('movie', {
        MovieId: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        gener: {
            type: DataTypes.STRING,
            allowNull: false
        },
        releaseDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    })
    
    return Movie;
}
