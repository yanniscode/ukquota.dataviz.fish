-- insert en bdd (json) :

INSERT INTO `zones` (`id_zone`, `name_zone`, `z_coord`) VALUES
(10, 'North Sea', '[[55, 0], [58, 0], [58, 4], [55, 4], [55, 0]]');

INSERT INTO `zones` (`id_zone`, `name_zone`, `z_coord`) VALUES
(10, 'North Sea', '{ "type": "FeatureCollection", "features": [{ "type": "Feature", "properties": {}, "geometry": { "type": "LineString", "coordinates": [[ -73.828125, 59.5343180010956 ],[-34.1015625, 18.646245142670608], [-62.22656249999999, -42.553080288955805], [-60.46875, -42.293564192170074]] }} ] }');

-- INSERTION POLYGON (SI TYPE CHOISI DANS MYSQL):

EX: 
SET @g = 'POLYGON((0 0,10 0,10 10,0 10,0 0),(5 5,7 5,7 7,5 7, 5 5))';
INSERT INTO geom VALUES (ST_PolygonFromText(@g));


-- geojson type (structure exemple - pas utilisée ici !): 
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            -73.828125,
            59.5343180010956
          ],
          [
            -34.1015625,
            18.646245142670608
          ],
          [
            -62.22656249999999,
            -42.553080288955805
          ],
          [
            -60.46875,
            -42.293564192170074
          ]
        ]
      }
    }
  ]
}


-- ***********************************

-- REQUETES :

-- ***********************************
-- REQUÊTE GÉNÉRALE:

-- ROUTE : "/AllFishings"

-- AVANT : 

SELECT id_fishing, name_specie, date, value_landing, value_quota, super_zone, zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie ORDER BY id_fishing ASC;

-- MAINTENANT:

SELECT id_fishing, name_specie, zone, super_zone, date, value_landing, value_quota, z_coord FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN super_zones ON fishzone_join.id_super_zone = super_zones.id_super_zone ORDER BY id_fishing; -- ok



-- DIVERSES REQUETES (TEST) :

SELECT id_fishing, id_specie, date, value_landing, value_quota FROM fishing 
INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join 
ORDER BY id_fishing; -- ok

SELECT id_fishing, name_specie, date, value_landing, value_quota FROM fishing 
    INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join 
    INNER JOIN species ON fishzone_join.id_specie = species.id_specie 
ORDER BY id_fishing; -- ok


SELECT zone, max(date) AS date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE date IN (SELECT max(date) FROM fishing) GROUP BY zone ORDER BY zone; -- ok


-- **************
-- I> Pour 'DATES-CHART' :

-- /AllFishingDates :

-- AVANT :

SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE date >= '2018-02-07' GROUP BY date ORDER BY date ASC;

-- MAINTENANT :

SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join WHERE date >= (SELECT min(date) FROM fishing) GROUP BY date ORDER BY date ASC;

-- ***************
-- II> Pour 'SPECIES-CHART' :

-- /AllFishingSpecies :

-- AVANT :

SELECT name_specie, max(date) AS date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date IN (SELECT max(date) FROM fishing) GROUP BY name_specie ORDER BY name_specie;


-- MAINTENANT :

SELECT name_specie, max(date) AS date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date IN (SELECT max(date) FROM fishing) GROUP BY name_specie ORDER BY name_specie;



-- III> Pour 'ZONES-CHART' :

-- /AllFishingZones :


-- #######################################################################################
SELECT zones.id_zone, zone, z_coord, max(date) AS date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing 
INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join 
INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone 
INNER JOIN species ON fishzone_join.id_specie = species.id_specie 
WHERE date IN (SELECT max(date) FROM fishing) 
GROUP BY zones.id_zone ORDER BY zones.id_zone; -- ok ! (pb 'GROUP BY' empêchant d'avoir name_zone et z_coord ensembles = résolu !)


-- /AllFishingZones (+ espèces): = pas beau (superposition !)
 
SELECT zones.id_zone, zone, z_coord, name_specie, max(date) AS date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing 
INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join 
INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone 
INNER JOIN species ON fishzone_join.id_specie = species.id_specie 
WHERE date IN (SELECT max(date) FROM fishing) GROUP BY zones.id_zone, species.name_specie ORDER BY zones.id_zone; -- ok ! + species



-- *******

-- REQUETES POUR LES FORMULAIRES DE RECHERCHE :


-- REQUETES (BARRES DE ZONES ET MAP ZONES) :

-- UNE ESPÈCE, TOUTES ZONES, UNE DATE :

-- AVANT (dans 'api.js'):

-- SELECT zone, name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date = '"+ requestedFishDate +"' GROUP BY zone ORDER BY zone ASC";

-- maintenant :
SELECT zone, name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, z_coord FROM fishing 
INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join
INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone 
INNER JOIN species ON fishzone_join.id_specie = species.id_specie 
WHERE name_specie = 'Cod' AND date = '2019-07-17' GROUP BY zones.id_zone ORDER BY zones.id_zone ASC; -- OK !

--

SELECT zone, name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, z_coord FROM fishing 
INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join
INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone 
INNER JOIN species ON fishzone_join.id_specie = species.id_specie 
WHERE name_specie = '"+ requestedFishName +"' AND date = '"+ requestedFishDate +"' GROUP BY zones.id_zone ORDER BY zones.id_zone ASC;


-- SELECT zone, name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date = '"+ requestedFishDate +"' GROUP BY zone ORDER BY zone ASC;

-- ***********************

-- UNE ESPÈCE, UNE ZONE, UNE DATE :

-- avant :

SELECT zone, name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY zone ORDER BY zone ASC;

-- maintenant :

SELECT zone, name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, z_coord FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie  WHERE name_specie = 'Cod' AND zone = 'North Sea' AND date = '2019-07-17' GROUP BY zones.id_zone ORDER BY zones.id_zone ASC; -- OK

--

SELECT zone, name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, z_coord FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie  WHERE name_specie = '"+ requestedFishName +"' AND zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY zones.id_zone ORDER BY zones.id_zone ASC;

-- SELECT zone, name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie  WHERE name_specie = '"+ requestedFishName +"' AND zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY zone ORDER BY zone ASC;



-- TOUTES ESPECES, UNE ZONE, UNE DATE :
-- AVANT :

SELECT zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY zone ORDER BY zone ASC;

-- maintenant :

SELECT zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, z_coord FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = 'North Sea' AND date = '2019-07-17' GROUP BY zones.id_zone ORDER BY zones.id_zone ASC; -- OK

--

SELECT zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, z_coord FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY zones.id_zone ORDER BY zones.id_zone ASC;

-- SELECT zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY zone ORDER BY zone ASC;


-- TOUTES ESPECES, TOUTE ZONES, UNE DATE :

-- AVANT : 
SELECT zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE date = '"+ requestedFishDate +"' GROUP BY zone ORDER BY zone ASC;

-- MAINTENANT :

SELECT zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, z_coord FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE date = '2019-07-17' GROUP BY zones.id_zone ORDER BY zones.id_zone ASC; -- OK

--

SELECT zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, z_coord FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE date = '"+ requestedFishDate +"' GROUP BY zones.id_zone ORDER BY zones.id_zone ASC;

-- SELECT zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE date = '"+ requestedFishDate +"' GROUP BY zone ORDER BY zone ASC;



-- ******************************

-- REQUETES DE MISE A JOUR DES CHAMPS SELECT (SIMPLES DATES):

-- ******************************

-- TOUTES ESPECES, UNE DATE

-- AVANT :

SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date = '"+ requestedFishDate +"' ORDER BY zone ASC;

-- MAINTENANT :

SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE date = '2019-07-17' ORDER BY zone ASC; -- ok

--

SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE date = '"+ requestedFishDate +"' ORDER BY zone ASC;


--------------------

-- TOUTES ESPECES, TOUTES DATES

-- avant :

SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie ORDER BY zone ASC;

-- maintenant :

SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone ORDER BY zone ASC;


-- UNE ESPÈCE, UNE DATE :

-- AVANT :

SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date = '"+ requestedFishDate +"' ORDER BY zone ASC;

-- MAINTENANT :

SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = 'Cod' AND date = '2019-07-17' ORDER BY zone ASC;

-- 

SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date = '"+ requestedFishDate +"' ORDER BY zone ASC;



-- UNE ESPÈCE, TOUTES DATES :

-- AVANT :

SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' ORDER BY zone ASC;

-- MAINTENANT :

SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = 'Cod' ORDER BY zone ASC;

-- 

SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' ORDER BY zone ASC;


-- ***************************

-- MISE A JOUR DU CHAMPS NOMS D'ESPÈCES :

-- ***************************

-- TOUTES ZONES, UNE DATE :

-- AVANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date = '"+ requestedFishDate +"' ORDER BY name_specie ASC;

-- MAINTENANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date = '2019-07-17' ORDER BY name_specie ASC;

--

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date = '"+ requestedFishDate +"' ORDER BY name_specie ASC;


-- TOUTES ZONES, TOUTES DATES :

-- AVANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie ORDER BY name_specie ASC;

-- MAINTENANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie ORDER BY name_specie ASC;



-- UNE ZONE, UNE DATE :

-- AVANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' ORDER BY name_specie ASC;


-- MAINTENANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = 'North Sea' AND date = '2019-07-17' ORDER BY name_specie ASC;

--

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' ORDER BY name_specie ASC;



-- UNE ZONE, TOUTES DATES :

-- AVANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE zone = '"+ requestedFishZone +"' ORDER BY name_specie ASC;

-- MAINTENANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = 'North Sea' ORDER BY name_specie ASC;

--

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' ORDER BY name_specie ASC;


-- MISE A JOUR DU CHAMPS SIMPLE DATE :


-- TOUTES ESPÈCES, TOUTES ZONES :

-- AVANT :

SELECT DISTINCT date FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie ORDER BY date DESC;

-- MAINTENANT :

SELECT DISTINCT date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join ORDER BY date DESC; -- ok


-- TOUTES ESPÈCES, UNE ZONE :

-- AVANT :

SELECT DISTINCT date FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE zone = '"+ requestedFishZone +"' ORDER BY date DESC;

-- MAINTENANT :

SELECT DISTINCT date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = 'North Sea' ORDER BY date DESC; -- ok

--

SELECT DISTINCT date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' ORDER BY date DESC;



-- UNE ESPÈCE, TOUTES ZONES :

-- AVANT :

SELECT DISTINCT date FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' ORDER BY date DESC;

-- MAINTENANT :

SELECT DISTINCT date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = 'Cod' ORDER BY date DESC;

--

SELECT DISTINCT date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' ORDER BY date DESC;



-- UNE ESPÈCE, UNE ZONE :

-- AVANT :

SELECT DISTINCT date FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND zone = '"+ requestedFishZone +"' ORDER BY date DESC;

-- MAINTENANT :

SELECT DISTINCT date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE name_specie = 'Cod' AND zone = 'North Sea' ORDER BY date DESC;

-- 

SELECT DISTINCT date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE name_specie = '"+ requestedFishName +"' AND zone = '"+ requestedFishZone +"' ORDER BY date DESC;




-- ********************

-- REQUETES POUR METTRE A JOUR LES CHAMPS 'SELECT' (AVEC PLAGE DE DATE) DU FORMULAIRE DE RECHERCHE

-- ********************


-- TOUTES ESPÈCES, UNE DATE DE DÉBUT, UNE DATE DE FIN :

-- AVANT :

SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY zone ASC;

-- MAINTENANT :

SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE date >= '2019-01-09' AND date <= '2019-07-17' ORDER BY zone ASC; -- ok

--

SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY zone ASC;




-- TOUTES ESPÈCES, PAS DE DATE DE DÉBUT, UNE DATE DE FIN :

-- AVANT :

SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date <= '"+ requestedFishDateEnd +"' ORDER BY zone ASC;

-- MAINTENANT :


SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE date <= '2019-07-17' ORDER BY zone ASC;

--

SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE date <= '"+ requestedFishDateEnd +"' ORDER BY zone ASC;



-- TOUTES ESPÈCES, UNE DATE DE DÉBUT, PAS DE DATE DE FIN :

-- AVANT :

SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date >= '"+ requestedFishDateBegin +"' ORDER BY zone ASC;

-- MAINTENANT :

SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE date >= '2019-07-17' ORDER BY zone ASC;

--

SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE date >= '"+ requestedFishDateBegin +"' ORDER BY zone ASC;



-- TOUTES ESPÈCES, PAS DE DATE DE DÉBUT, PAS DE DATE DE FIN :

-- AVANT :

SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie ORDER BY zone ASC;

-- MAINTENANT :

SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone ORDER BY zone ASC; -- OK



-- UNE ESPÈCE, UNE DATE DE DÉBUT, UNE DATE DE FIN :

-- AVANT :

SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY zone ASC;

-- MAINTENANT :

SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = 'Cod' AND date >= '2019-01-09' AND date <= '2019-07-17' ORDER BY zone ASC; -- OK

--

SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY zone ASC;



-- UNE ESPÈCE, PAS DE DATE DE DÉBUT, UNE DATE DE FIN :

-- AVANT :

SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY zone ASC;

-- MAINTENANT :

SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = 'Cod' AND date <= '2019-07-17' ORDER BY zone ASC;

--

SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY zone ASC;



-- UNE ESPÈCE, UNE DATE DE DÉBUT, PAS DE DATE DE FIN :

-- AVANT :

SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date >= '"+ requestedFishDateBegin +"' ORDER BY zone ASC;

-- MAINTENANT :

SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = 'Cod' AND date >= '2019-07-17' ORDER BY zone ASC;

-- 


SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date >= '"+ requestedFishDateBegin +"' ORDER BY zone ASC;


-- UNE ESPÈCE, PAS DE DATE DE DÉBUT, PAS DE DATE DE FIN :

-- AVANT :

SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' ORDER BY zone ASC;


-- MAINTENANT :

SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = 'Cod' ORDER BY zone ASC;

--

SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' ORDER BY zone ASC;



-- *********************************************

-- MISE A JOUR DU CHAMPS NOM D'ESPÈCES :

-- *********************************************


-- TOUTES ZONES, UNE DATE DE DÉBUT, UNE DATE DE FIN :

-- AVANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC;

-- MAINTENANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date >= '2019-01-09' AND date <= '2019-07-17' ORDER BY name_specie ASC; -- OK

--

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC;



-- TOUTES ZONES, PAS DE DATE DE DÉBUT, UNE DATE DE FIN :

-- AVANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC;

-- MAINTENANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date <= '2019-07-17' ORDER BY name_specie ASC;

--

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC;



-- TOUTES ZONES, UNE DATE DE DÉBUT, PAS DE DATE DE FIN :

-- AVANT:

SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date >= '"+ requestedFishDateBegin +"' ORDER BY name_specie ASC;

-- MAINTENANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date >= '2019-07-17' ORDER BY name_specie ASC; -- OK

--

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date >= '"+ requestedFishDateBegin +"' ORDER BY name_specie ASC;

-- TOUTES ZONES, PAS DE DATE DE DÉBUT, PAS DE DATE DE FIN :

-- AVANT:

SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie ORDER BY name_specie ASC;

-- MAINTENANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie ORDER BY name_specie ASC; -- OK


-- UNE ZONE, UNE DATE DE DÉBUT, UNE DATE DE FIN :

-- AVANT:

SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE zone = '"+ requestedFishZone +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC;

-- MAINTENANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = 'North Sea' AND date >= '2019-01-09' AND date <= '2019-07-17' ORDER BY name_specie ASC;

--

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC;



-- UNE ZONE, PAS DE DATE DE DÉBUT, PAS DE DATE DE FIN :

-- AVANT:

SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE zone = '"+ requestedFishZone +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC;

-- MAINTENANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = 'North Sea' AND date <= '2019-07-17' ORDER BY name_specie ASC;

--

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC;



-- UNE ZONE, UNE DATE DE DÉBUT, PAS DE DATE DE FIN :

-- AVANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE zone = '"+ requestedFishZone +"' AND date >= '"+ requestedFishDateBegin +"' ORDER BY name_specie ASC;

-- MAINTENANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = 'North Sea' AND date >= '2019-01-09' ORDER BY name_specie ASC;

--

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date >= '"+ requestedFishDateBegin +"' ORDER BY name_specie ASC;


-- UNE ZONE, PAS DE DATE DE DÉBUT, PAS DE DATE DE FIN :

-- AVANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE zone = '"+ requestedFishZone +"' ORDER BY name_specie ASC;

-- MAINTENANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = 'North Sea' ORDER BY name_specie ASC;

--

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' ORDER BY name_specie ASC;



-- ***********************************************

-- MISE A JOUR DU CHAMPS DATES : (?? SI CHOIX D'UNE SELECT-LISTE DÉROULANTE)
-- ***********************************************


-- PAS DE DATE DE DÉBUT, PAS DE DATE DE FIN :

-- AVANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie ORDER BY name_specie ASC;

-- MAINTENANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie ORDER BY name_specie ASC;



-- UNE DATE DE DÉBUT, UNE DATE DE FIN :

-- AVANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC;

-- MAINTENANT :

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date >= '2019-01-09' AND date <= '2019-07-19' ORDER BY name_specie ASC;

--

SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC;






-- ***********************************

-- **************************************** COURBES DE DATES - REQUETES : 
-- ******************************************


-- UNE ESPÈCE, UNE ZONE :

-- AVANT :

SELECT * FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND zone = '"+ requestedFishZone +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY date ASC;


-- MAINTENANT :

SELECT * FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE name_specie = 'Cod' AND zone = 'North Sea' AND date >= '2019-01-09' AND date <= '2019-07-17' ORDER BY date ASC; -- ok

--

SELECT * FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE name_specie = '"+ requestedFishName +"' AND zone = '"+ requestedFishZone +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY date ASC;



-- UNE ESPÈCE, TOUTES ZONES :

-- AVANT:

SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date, name_specie FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' GROUP BY date ORDER BY date ASC;

-- MAINTENANT:

SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date, name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = 'Cod' AND date >= '2019-01-09' AND date <= '2019-07-17' GROUP BY date ORDER BY date ASC; -- ok

--

SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date, name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' GROUP BY date ORDER BY date ASC;



-- TOUTES ESPÈCES, UNE ZONE :

-- AVANT:

SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date, zone FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE zone = '"+ requestedFishZone +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' GROUP BY date ORDER BY date ASC;

-- MAINTENANT

SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date, zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = 'North Sea' AND date >= '2019-01-09' AND date <= '2019-07-17' GROUP BY date ORDER BY date ASC;

--

SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date, zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' GROUP BY date ORDER BY date ASC;



-- TOUTES ESPÈCES, TOUTES ZONES:

-- AVANT:

SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' GROUP BY date ORDER BY date ASC;

-- MAINTENANT:

SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join WHERE date >= '2019-01-09' AND date <= '2019-07-17' GROUP BY date ORDER BY date ASC;

--

SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join WHERE date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' GROUP BY date ORDER BY date ASC;



-- TOUTES ESPÈCES, UNE ZONE :

-- AVANT:

SELECT name_specie, zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY name_specie ORDER BY name_specie ASC;

-- MAINTENANT:

SELECT name_specie, zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = 'North Sea' AND date = '2019-07-17' GROUP BY name_specie ORDER BY name_specie ASC;

--

SELECT name_specie, zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY name_specie ORDER BY name_specie ASC;



-- UNE ESPÈCE, UNE ZONE:

-- AVANT:

SELECT name_specie, zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY name_specie ORDER BY name_specie ASC;

-- MAINTENANT:

SELECT name_specie, zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE name_specie = 'Cod' AND zone = 'North Sea' AND date = '2019-07-17' GROUP BY name_specie ORDER BY name_specie ASC;

--

SELECT name_specie, zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE name_specie = '"+ requestedFishName +"' AND zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY name_specie ORDER BY name_specie ASC;



-- UNE ESPÈCE, TOUTES ZONES:

-- AVANT:

SELECT name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date = '"+ requestedFishDate +"' GROUP BY name_specie ORDER BY name_specie ASC;

-- MAINTENANT:

SELECT name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = 'Cod' AND date = '2019-07-17' GROUP BY name_specie ORDER BY name_specie ASC;

--

SELECT name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date = '"+ requestedFishDate +"' GROUP BY name_specie ORDER BY name_specie ASC;



-- TOUTES ESPÈCES, TOUTES ZONES:

-- AVANT:

SELECT name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE date = '"+ requestedFishDate +"' GROUP BY name_specie ORDER BY name_specie ASC;

-- MAINTENANT:

SELECT name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date = '2019-07-17' GROUP BY name_specie ORDER BY name_specie ASC;

-- 

SELECT name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date = '"+ requestedFishDate +"' GROUP BY name_specie ORDER BY name_specie ASC;

