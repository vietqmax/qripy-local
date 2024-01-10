const { nanoid } = require('nanoid')

module.exports = (sequelize, DataTypes) => {
  const RelatedDish = sequelize.define(
    'RelatedDish',
    {
      id: {
        type: DataTypes.STRING(21),
        primaryKey: true,
        allowNull: false,
        defaultValue: () => nanoid(21),
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      store_id: {
        type: DataTypes.STRING(21),
        allowNull: false,
      },
      sort_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: 'related_dishes',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      paranoid: false,
    }
  )

  return RelatedDish
}
