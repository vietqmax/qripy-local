const { nanoid } = require('nanoid')

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      id: {
        type: DataTypes.STRING(21),
        primaryKey: true,
        allowNull: false,
        defaultValue: () => nanoid(21),
      },
      // store_id: {
      //   type: DataTypes.STRING(21),
      //   allowNull: false,
      // },
      // display: {
      //   type: DataTypes.ENUM('list', 'grid'),
      //   defaultValue: 'list',
      // },
      sort_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: 'tags',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      paranoid: false,
    }
  )

  return Tag
}
