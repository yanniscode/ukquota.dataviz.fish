/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fishing', {
    id_fishing: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_specie: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'species',
        key: 'id_specie'
      }
    },
    id_zone: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'zones',
        key: 'id_zone'
      }
    },
    id_date: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'dates',
        key: 'id_date'
      }
    },
    value_landing: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    value_quota: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'fishing',
    timestamps: false
  });
};
