const { nanoid } = require('nanoid')

module.exports = (sequelize, DataTypes) => {
  const DishOptionTranslate = sequelize.define(
    'DishOptionTranslate',
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
        allowNull: true,
        defaultValue: null,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
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
      tableName: 'dish_option_translates',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      paranoid: false,
    }
  )

  DishOptionTranslate.associate = (models) => {
    // Product.belongsToMany(models.Category, {
    //   through: 'products_categories_foreign',
    //   foreignKey: 'product_id',
    //   otherKey: 'category_id',
    //   as: 'Categories',
    // })
    DishOptionTranslate.belongsTo(models.DishOption, {
      foreignKey: 'dish_option_id',
    })
  }

  return DishOptionTranslate
}
