module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Users.associate = (models) => {
        Users.hasMany(models.Arts, {
            onDelete: "cascade",
        });
        Users.hasMany(models.Bill, {
            onDelete: "cascade",
        });
        Users.hasMany(models.Comments, {
            onDelete: "cascade",
        });
        Users.hasMany(models.Order, {
            onDelete: "cascade",
        });
    };

    return Users;
};