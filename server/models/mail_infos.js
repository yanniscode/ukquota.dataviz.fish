/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mail_infos', {
    id_mail: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    mail_number: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'mail_infos'
  });
};
