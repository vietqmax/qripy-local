const { nanoid } = require('nanoid')

module.exports = (sequelize, DataTypes) => {
  const Dish = sequelize.define(
    'Dish',
    {
      id: {
        type: DataTypes.STRING(21),
        primaryKey: true,
        allowNull: false,
        defaultValue: () => nanoid(21),
      },
      store_id: {
        type: DataTypes.STRING(21),
        allowNull: false,
      },
      category_id: {
        type: DataTypes.STRING(21),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      price: {
        type: DataTypes.DECIMAL(18, 0),
        defaultValue: 0,
      },
      tax_id: {
        type: DataTypes.STRING(21),
        allowNull: true,
        defaultValue: null,
      },
      product_option: {
        type: DataTypes.STRING(21),
        allowNull: false,
      },
      product_relate: {
        type: DataTypes.STRING(21),
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      sort_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      published_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'dishs',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      paranoid: false,
    }
  )

  Dish.associate = (models) => {
    Dish.belongsTo(models.Category, {
      foreignKey: 'category_id',
    })
  }

  return Dish
}
