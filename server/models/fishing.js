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
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
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
    tableName: 'fishing'
  });
};


/*
module.exports = function(sequelize, DataTypes) {
  var Fishing = sequelize.define('fishing', {
    id_fishing: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_specie: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    value_landing: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    value_quota: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  },
  {
    tableName: 'fishing'
  });

// test sequelize (marche pas) : Cannot read property 'name' of undefined
/*
  Fishing.findOne({ where: { id_fishing: '1'} }).then(espece => {
    res.json(espece);
    console.log(espece);
    return espece;
  });
};

*/