/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fishing', {
    id_fishing: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_fishzone_join: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'fishzone_join',
        key: 'id_fishzone_join'
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    value_landing: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    value_quota: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'fishing'
  });
};
