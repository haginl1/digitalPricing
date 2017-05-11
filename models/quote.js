module.exports = function(sequelize, DataTypes){
    var Quote = sequelize.define("Quote",{
        company: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    });
    return Quote;
}