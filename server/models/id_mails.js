/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('id_mails', {
    mail_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'id_mails'
  });
};
