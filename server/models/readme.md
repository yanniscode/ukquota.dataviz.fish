Création des fichiers de modèles de la BDD:

sequelize-auto :

sudo npm install -g sequelize-auto
sudo npm install -g mysql


commande :

sequelize-auto -o "./server/models" -d test_sakana -h localhost -u root -x test -e mysql