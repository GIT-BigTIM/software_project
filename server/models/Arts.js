module.exports = (sequelize, DataTypes) => {

    const Arts = sequelize.define("Arts", {
        img: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        desciption: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Arts.associate = (models) => {
        Arts.hasMany(models.Comments, {
            onDelete: "cascade",
        });

        Arts.belongsTo(models.Categorys, {
            onDelete: "cascade",
        });

        Arts.hasOne(models.Order, {
            onDelete: "cascade",
        });

    };
    return Arts;
};