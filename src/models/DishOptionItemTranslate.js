const { nanoid } = require('nanoid')

module.exports = (sequelize, DataTypes) => {
  const DishOptionItemTranslate = sequelize.define(
    'DishOptionItemTranslate',
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
      dish_option_item_id: {
        type: DataTypes.STRING(21),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(191),
        allowNull: true,
      },
      language_code: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('main', 'option'),
        defaultValue: 'main',
      },
    },
    {
      tableName: 'dish_option_item_translates',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      paranoid: false,
    }
  )

  DishOptionItemTranslate.associate = (models) => {
    DishOptionItemTranslate.belongsTo(models.DishOptionItem, {
      foreignKey: 'dish_option_item_id',
    })
  }

  return DishOptionItemTranslate
}
