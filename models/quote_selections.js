module.exports = function(sequelize, DataTypes){
    var QuoteSelections = sequelize.define("QuoteSelections",{
        contract_term: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        year_one_channels: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        year_two_channels: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        year_three_channels: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        HLS: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: true
        },
        HDS: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        MPEG_DASH: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        RTMP: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        support_plan: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return QuoteSelections;
}