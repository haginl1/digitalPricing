module.exports = function(sequelize, DataTypes){
    var QuotedPrices = sequelize.define("QuotedPrices",{
        year_one_monthly_streaming: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        year_two_monthly_streaming: {
            type: DataTypes.DECIMAL
        },
        year_three_monthly_streaming: {
            type: DataTypes.DECIMAL
        },
        year_one_setup_fee: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        year_two_setup_fee: {
            type: DataTypes.DECIMAL 
        },
        year_three_setup_fee: {
            type: DataTypes.DECIMAL
        },
        year_one_support_fee: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        year_two_support_fee: {
            type: DataTypes.DECIMAL   
        },
        year_three_support_fee: {
            type: DataTypes.DECIMAL
        }
    });
    return QuotedPrices;
}