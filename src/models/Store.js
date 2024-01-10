const { nanoid } = require('nanoid')

module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define(
    'Store',
    {
      id: {
        type: DataTypes.STRING(21),
        primaryKey: true,
        allowNull: false,
        defaultValue: () => nanoid(21),
      },

      email: {
        type: DataTypes.STRING(191),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(191),
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING(191),
        allowNull: false,
      },

      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      timezone: {
        type: DataTypes.STRING(191),
        allowNull: false,
      },

      country_name: {
        type: DataTypes.STRING(191),
        allowNull: false,
      },

      country_code: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },

      native_language_code: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },

      is_multi_language: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },

      is_translate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      other_language: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return this.getDataValue('other_language')?.split(';')
        },
        set(val) {
          this.setDataValue('other_language', val.join(';'))
        },
      },

      currency: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },

      usage_fee: {
        type: DataTypes.DECIMAL(18, 0),
        allowNull: true,
      },

      payment_method: {
        type: DataTypes.ENUM('cash', 'credit'),
        allowNull: false,
        defaultValue: 'cash',
      },

      is_tax: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      tableName: 'stores',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      paranoid: false,
    }
  )

  return Store
}
