module.exports = function(sequelize, DataTypes) {

    const Library = sequelize.define('Library', {
        
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
    }, {
        freezeTableName: true
       } 
    );

    Library.associate = function(models) {
        Library.belongsTo(models.Users, {
            foreignKey: 
                {
                    allowNull: false
                }
        });
    };

    return Library;
};
  
