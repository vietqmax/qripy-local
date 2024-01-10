const { nanoid } = require('nanoid')

module.exports = (sequelize, DataTypes) => {
  const DishOptionItem = sequelize.define(
    'DishOptionItem',
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
      dish_option_id: {
        type: DataTypes.STRING(21),
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING(191),
        allowNull: true,
      },
      sort_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: 'dish_option_items',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      paranoid: false,
    }
  )

  DishOptionItem.associate = (models) => {
    DishOptionItem.hasMany(models.DishOptionItemTranslate, {
      foreignKey: 'dish_option_item_id',
    })
  }

  return DishOptionItem
}
