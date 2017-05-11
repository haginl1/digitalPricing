module.exports = function(sequelize, DataTypes){
    var ProtocolRates = sequelize.define("ProtocolRates",{
        included_protocol_count: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        additional_protocol_rate_percent: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    });
    return ProtocolRates;
}