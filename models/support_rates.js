module.exports = function(sequelize, DataTypes){
    var SupportRates = sequelize.define("SupportRates",{
        plan: {
            type: DataTypes.STRING,
            allowNull: false
        },
        plan_fee_percent: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    });
    return SupportRates;
}