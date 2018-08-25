module.exports = function(sequelize, DataTypes) {

    const forsale = sequelize.define('forsale', {
        
        ISBN: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Title: {
            type: DataTypes.STRING,
        },
        Author: {
            type: DataTypes.STRING
        },
        Min_Price: {
            type: DataTypes.DECIMAL (10, 2),
            allowNull: false
        },
        Notes: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        freezeTableName: true
       } 
    );

    forsale.associate = function(models) {
        forsale.belongsTo(models.Users, {
            foreignKey: 
                {
                    allowNull: false
                }
        });
    };

    return forsale;
};
  