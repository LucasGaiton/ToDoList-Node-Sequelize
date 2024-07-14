const {DataTypes} = require('sequelize');
module.exports = (sequelize)=>{
    sequelize.define("Task", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    })

}