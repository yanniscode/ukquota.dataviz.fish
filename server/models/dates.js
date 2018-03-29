/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dates', {
    id_date: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    value_date_xlsx: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'dates'
  });
};
