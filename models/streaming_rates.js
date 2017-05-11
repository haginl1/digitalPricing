module.exports = function(sequelize, DataTypes){
    var StreamingRates = sequelize.define("StreamingRates",{
        min_channels: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        max_channels: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        one_year_rate: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        two_year_rate: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        three_year_rate: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        setup_fee_percent: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    });
    return StreamingRates;
}