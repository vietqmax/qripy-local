const { nanoid } = require('nanoid')

module.exports = (sequelize, DataTypes) => {
  const DishTranslate = sequelize.define(
    'DishTranslate',
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
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
      tableName: 'dish_translates',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      paranoid: false,
    }
  )

  return DishTranslate
}
