module.exports = function(sequelize, DataTypes){
    var Quote = sequelize.define("Quote",{
            userID: {
            type: DataTypes.STRING,
            allowNull: false
        },
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
            allowNull: false,
            defaultValue: sequelize.NOW,
            get ()
            {
                if (typeof this.getDataValue('date').getMonth === 'function') {
                    return this.getDataValue('date').toDateString()
                }
                else {
                    return this.getDataValue('date')
                }
            }
        },
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
        },
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
        },
        year_one_annual_fee: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        year_two_annual_fee: {
            type: DataTypes.DECIMAL
        },
        year_three_annual_fee: {
            type: DataTypes.DECIMAL
        }
    });
    return Quote;
}