module.exports = function(sequelize, DataTypes) {

    const Wishlist = sequelize.define('Wishlist', {
        
        ISBN: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Title: {
            type: DataTypes.STRING,
        },
        Author: {
            type: DataTypes.STRING
        },
        Max_Price: {
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

    Wishlist.associate = function(models) {
        Wishlist.belongsTo(models.Users, {
            foreignKey: 
                {
                    allowNull: false
                }
        });
    };

    return Wishlist;
};
  