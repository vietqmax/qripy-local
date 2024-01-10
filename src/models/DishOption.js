const { nanoid } = require('nanoid')

module.exports = (sequelize, DataTypes) => {
  const DishOption = sequelize.define(
    'DishOption',
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
      display: {
        type: DataTypes.ENUM('list', 'grid'),
        defaultValue: 'list',
      },
      sort_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: 'dish_options',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      paranoid: false,
    }
  )

  DishOption.associate = (models) => {
    // Product.belongsToMany(models.Category, {
    //   through: 'products_categories_foreign',
    //   foreignKey: 'product_id',
    //   otherKey: 'category_id',
    //   as: 'Categories',
    // })
    // Product.belongsTo(models.Category, {
    //   foreignKey: 'category_id',
    // })
    DishOption.hasMany(models.DishOptionTranslate, {
      foreignKey: 'dish_option_id',
    })
  }

  return DishOption
}
