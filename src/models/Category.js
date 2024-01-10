const { nanoid } = require('nanoid')

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
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
      parent_id: {
        type: DataTypes.STRING(21),
        allowNull: true,
        defaultValue: null,
      },
      sort_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: 'categories',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      paranoid: false,
    }
  )

  Category.associate = (models) => {
    Category.belongsTo(models.Category, {
      as: 'parents',
      foreignKey: 'parent_id',
      targetKey: 'id',
    })

    Category.hasMany(models.Category, {
      as: 'childrens',
      foreignKey: 'parent_id',
    })

    Category.hasMany(models.CategoryTranslate, {
      foreignKey: 'category_id',
    })

    // Category.hasOne(models.Product, {
    //   foreignKey: 'category_id',
    // })
  }

  return Category
}
