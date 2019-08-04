import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Fish } from '../todo-class/fish';

/*
export interface Fish {
  name_specie: string;
  super_zone: string;
  date: Date;
}
*/

@Injectable({
  providedIn: 'root'
})

export class FishService {
  layer: any;

  constructor(private http: HttpClient) {}



// **************************************************************************************************************** //

// REQUETE GÉNÉRIQUE (POUR UN TABLEAU DE BASE DANS LA METHODE 'ONINIT' - CF : LES DIFFÉRENTS 'CHART.COMPONENT') //

// **************************************************************************************************************** //

public getAllFishings(): Observable<Fish[]> { // UTILISÉE PAR LE TABLEAU DANS 'QUICKFILTER-BIS'
return this.http.get('http://localhost:3000/api/AllFishings')
.pipe(
  map(
    (jsonArray: Object[]) => jsonArray.map(jsonItem => Fish.fromJson(jsonItem)),
  )
);
//  .map(res => JSON.stringify(res));
}



// *********************************************************************************** //

// *****       APPELS À L'API POUR LES CHAMPS 'SELECT' DU FORMULAIRE DE RECHERCHE      ***** //

// *********************************************************************************** //


public getFishes(): Observable<Fish[]> {
  return this.http.get('http://localhost:3000/api/NameSpecie')
  .pipe(
    map(
      (jsonArray: Object[]) => jsonArray.map(jsonItem => Fish.fromJson(jsonItem)),
    )
  );
}


public getSuperZone(): Observable<Fish[]> {
  return this.http.get('http://localhost:3000/api/SuperZone')
  .pipe(
    map(
      (jsonArray: Object[]) => jsonArray.map(jsonItem => Fish.fromJson(jsonItem)),
    )
  );
}

public getZone(): Observable<Fish[]> {
  return this.http.get('http://localhost:3000/api/Zone')
  .pipe(
    map(
      (jsonArray: Object[]) => jsonArray.map(jsonItem => Fish.fromJson(jsonItem)),
    )
  );
}

// appel à l'API pour une date simple :
public getDate(): Observable<Fish[]> {
  return this.http.get('http://localhost:3000/api/Date')
  .pipe(
    map(
      (jsonArray: Object[]) => jsonArray.map(jsonItem => Fish.fromJson(jsonItem)),
    )
  );
}

// appel à l'API pour une plage de dates :
public getDate2(): Observable<Fish[]> {
  return this.http.get('http://localhost:3000/api/Date')
  .pipe(
    map(
      (jsonArray: Object[]) => jsonArray.map(jsonItem => Fish.fromJson(jsonItem)),
    )
  );
}




// ************************************************************************************************* //

// MÉTHODES POUR METTRE A JOUR LES CHAMPS 'SELECT' (AVEC UNE DATE SIMPLE) DU FORMULAIRE DE RECHERCHE //

// ************************************************************************************************* //

// getNewNameSp(name_specie: string, date2: string): Observable<Fish[]> {
//   return this.http.get<Fish[]>('http://localhost:3000/api/newnamesp/' + name_specie + '&' + date2);
// }

getNewZoneForSingleDate(name_specie: string, date: string): Observable<Fish[]> {
  return this.http.get<Fish[]>('http://localhost:3000/api/newZoneForSingleDate/' + name_specie + '&' + date);
}

getNewNamespForSingleDate(zone: string, date: string): Observable<Fish[]> {
  return this.http.get<Fish[]>('http://localhost:3000/api/newNameSpForSingleDate/' + zone + '&' + date);
}


getNewDateForSingleDate(name_specie: string, zone: string): Observable<Fish[]> {
  return this.http.get<Fish[]>('http://localhost:3000/api/newDateForSingleDate/' + name_specie + '&' + zone);
}




// ************************************************************************************************* //

// *****       MÉTHODES POUR METTRE A JOUR LES CHAMPS 'SELECT' (AVEC PLAGE DE DATE) DU FORMULAIRE DE RECHERCHE      ***** //

// ************************************************************************************************* //

// getNewNameSp(name_specie: string, date2: string): Observable<Fish[]> {
//   return this.http.get<Fish[]>('http://localhost:3000/api/newnamesp/' + name_specie + '&' + date2);
// }

getNewZone(name_specie: string, date2Begin: string, date2End: string): Observable<Fish[]> {
  return this.http.get<Fish[]>('http://localhost:3000/api/newZone/' + name_specie + '&' + date2Begin + '&' + date2End);
}

getNewNameSp(zone: string, date2Begin: string, date2End: string): Observable<Fish[]> {
  return this.http.get<Fish[]>('http://localhost:3000/api/newNameSp/' + zone + '&' + date2Begin + '&' + date2End);
}

getNewDate2(date2Begin: string, date2End: string): Observable<Fish[]> {
  return this.http.get<Fish[]>('http://localhost:3000/api/newDate2/' + date2Begin + '&' + date2End);
}






// **************************************************************************************************************** //

// REQUETES GÉNÉRIQUES (POUR UN GRAPHIQUE DE BASE DANS LA METHODE 'ONINIT' - CF : LES DIFFÉRENTS 'CHART.COMPONENT') //

// **************************************************************************************************************** //

// MÉTHODE GÉNÉRALE

  // getAllFishes(): Observable<Fish[]> {
  //   return this.http.get<Fish[]>('http://localhost:3000/api/fishes');
  // }

// I> MÉTHODE POUR DATES-CHART (ONINIT)

  getAllFishingDates(): Observable<Fish[]> {
    return this.http.get<Fish[]>('http://localhost:3000/api/AllFishingDates');
  }


  // II> MÉTHODE POUR SPECIES-CHART (ONINIT)

  getAllFishingSpecies(): Observable<Fish[]> {
    return this.http.get<Fish[]>('http://localhost:3000/api/AllFishingSpecies');
  }


  // getAllFishingSpecies(date: string): Observable<Fish[]> {
  //   return this.http.get<Fish[]>('http://localhost:3000/api/AllFishingSpecies/' + date);
  // }


  // III> MÉTHODE POUR ZONES-CHART (ONINIT)


  getAllFishingZones(): Observable<Fish[]> {
    return this.http.get<Fish[]>('http://localhost:3000/api/AllFishingZones');
  }

  // getAllFishingZones(date: string): Observable<Fish[]> {
  //   return this.http.get<Fish[]>('http://localhost:3000/api/AllFishingZones/' + date);
  // }


// ********************************

// *************************************************************************************

// RÉSULTATS DE REQUÊTES DE FORMULAIRE DE RECHERCHE SUR LES GRAPHIQUES
// MÉTHODE PAR 'END POINTS'

// *************************************************************************************



  // REQUÊTE 3 B : (SUBMIT)
  getAllZones(name_specie: string, zone: string, date: string): Observable<Fish[]> {
    return this.http.get<Fish[]>('http://localhost:3000/api/zones/' + name_specie + '&' + zone + '&' + date);
  }

  // REQUÊTE 3 A (test): (SUBMIT) // UTILISÉE DANS 'CHART-CHANGE-COMPONENT' (= TEST)
  getAllZonesTest(name_specie: string, zone: string, dateend: string): Observable<Fish[]> {
    return this.http.get<Fish[]>('http://localhost:3000/api/zones/' + name_specie + '&' + zone + '&' + dateend);
  }



// ****************

  // REQUÊTE 2 : (SUBMIT)
  getAllSpecies(name_specie: string, zone: string, date: string): Observable<Fish[]> {
    return this.http.get<Fish[]>('http://localhost:3000/api/species/' + name_specie + '&' + zone + '&' + date);
  }



// ****************

// REQUÊTE 1 B : (SUBMIT)
  getAllDates(name_specie: string, zone: string, datebegin: string, dateend: string): Observable<Fish[]> {
    return this.http.get<Fish[]>('http://localhost:3000/api/dates/' + name_specie + '&' + zone + '&' + datebegin + '&' + dateend);
  }

// REQUÊTE 1 A : (SUBMIT) // UTILISÉE DANS 'CHART-CHANGE-COMPONENT' (= TEST)
  getOneSpecie(name_specie: string, zone: string, datebegin: string, dateend: string): Observable<Fish[]> {
    return this.http.get<Fish[]>('http://localhost:3000/api/fishes/' + name_specie + '&' + zone + '&' + datebegin + '&' + dateend);
  }





// ******************************************

// les autres requetes possibles du CRUD (exemple) :


/*
  insertFish(fish: Fish): Observable<Fish> { // EXEMPLE NON UTILISÉ
    return this.http.post<Fish>('http://localhost:3000/api/fishes/', fish);
  }

  updateFish(fish: Fish): Observable<void> { // EXEMPLE NON UTILISÉ
    return this.http.put<void>('http://localhost:3000/api/fishes/' + fish.name_specie, fish);
  }

  deleteFish(name_specie: string) { // EXEMPLE NON UTILISÉ
    return this.http.delete('http://localhost:3000/api/fishes/' + name_specie);
  }
*/

}
