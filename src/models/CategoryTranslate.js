const { nanoid } = require('nanoid')

module.exports = (sequelize, DataTypes) => {
  const CategoryTranslate = sequelize.define(
    'CategoryTranslate',
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
      tableName: 'category_translates',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      paranoid: false,
    }
  )

  CategoryTranslate.associate = (models) => {
    CategoryTranslate.belongsTo(models.Category, {
      foreignKey: 'category_id',
    })
  }

  return CategoryTranslate
}
