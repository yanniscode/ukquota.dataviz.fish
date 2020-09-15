import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Fish } from '../shared/todo-class/fish';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';


@Injectable({       // *** Note: manière de créer un service 'singleton' d'après Angular 6.0
  providedIn: 'root'
})

export class FishService {
  
  private handleError: HandleError;

  public constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
  ) {
    this.handleError = httpErrorHandler.createHandleError('FishService');
  }



// **************************************************************************************************************** //

// REQUETES GÉNÉRIQUES (POUR UN TABLEAU DE BASE DANS LA METHODE 'ONINIT' - CF : LES DIFFÉRENTS 'CHART.COMPONENT') //

// **************************************************************************************************************** //

public getAllFishings(): Observable<Fish[]> { // UTILISÉE PAR LE TABLEAU DANS 'QUICKFILTER-BIS'

  return this.http.get('http://localhost:3000/api/AllFishings')
  .pipe(
    map(
      (jsonArray: Object[]) => jsonArray.map(jsonItem => Fish.fromJson(jsonItem)),
    ),
      catchError(this.handleError('getAllFishings', [])
    ),
  );
};


public getAllFishingsAtDate(): Observable<Fish[]> {   // *** Note: UTILISÉE PAR LE TABLEAU DANS 'QUICKFILTER-BIS'
  
  return this.http.get('http://localhost:3000/api/AllFishingsAtDate')
  .pipe(
    map(
      (jsonArray: Object[]) => jsonArray.map(jsonItem => Fish.fromJson(jsonItem)),
    ),
    catchError(
      this.handleError('getAllFishingsAtDate', [])
    ),
  );
};

// *********************************************************************************** //

// *****  APPELS À L'API POUR LES CHAMPS 'SELECT' DU FORMULAIRE DE RECHERCHE  ***** //

// *********************************************************************************** //


public getFishes(): Observable<Fish[]> {
  
  return this.http.get('http://localhost:3000/api/NameSpecie')
  .pipe(
    map(
      (jsonArray: Object[]) => jsonArray.map(jsonItem => Fish.fromJson(jsonItem)),
    ),
    catchError(this.handleError('getFishes', [])
    ),
  );
};


public getSuperZone(): Observable<Fish[]> {
  
  return this.http.get('http://localhost:3000/api/SuperZone')
  .pipe(
    map(
      (jsonArray: Object[]) => jsonArray.map(jsonItem => Fish.fromJson(jsonItem)),
    ),
    catchError(this.handleError('getSuperZone', [])
    ),
  );
};

public getZone(): Observable<Fish[]> {
  
  return this.http.get('http://localhost:3000/api/Zone')
  .pipe(
    map(
      (jsonArray: Object[]) => jsonArray.map(jsonItem => Fish.fromJson(jsonItem)),
    ),
    catchError(this.handleError('getZone', [])
    ),
  );
};

// appel à l'API pour une date simple :
public getDate(): Observable<Fish[]> {
  
  return this.http.get('http://localhost:3000/api/Date')
  .pipe(
    map(
      (jsonArray: Object[]) => jsonArray.map(jsonItem => Fish.fromJson(jsonItem)),
    ),
    catchError(this.handleError('getDate', [])
    ),
  );
};

// appel à l'API pour une plage de dates :
public getDate2(): Observable<Fish[]> {

  return this.http.get('http://localhost:3000/api/Date')
  .pipe(
    map(
      (jsonArray: Object[]) => jsonArray.map(jsonItem => Fish.fromJson(jsonItem)),
    ),
    catchError(this.handleError('getDate2', [])
    ),
  );
};




// ************************************************************************************************* //

// MÉTHODES POUR METTRE A JOUR LES CHAMPS 'SELECT' (AVEC UNE DATE SIMPLE) DU FORMULAIRE DE RECHERCHE //

// ************************************************************************************************* //


getNewZoneForSingleDate(name_specie: string, date: string): Observable<Fish[]> {
  
  return this.http.get<Fish[]>('http://localhost:3000/api/newZoneForSingleDate/' + name_specie + '&' + date)
  .pipe(
    catchError(
      this.handleError('getNewZoneForSingleDate', [])
    ),
  );
};

getNewNamespForSingleDate(zone: string, date: string): Observable<Fish[]> {
  return this.http.get<Fish[]>('http://localhost:3000/api/newNameSpForSingleDate/' + zone + '&' + date)
    .pipe(
      catchError(this.handleError('getNewNamespForSingleDate', [])
    ),
  );
};

getNewDateForSingleDate(name_specie: string, zone: string): Observable<Fish[]> {
  return this.http.get<Fish[]>('http://localhost:3000/api/newDateForSingleDate/' + name_specie + '&' + zone)
    .pipe(
      catchError(this.handleError('getNewDateForSingleDate', [])
    ),
  );
};




// ************************************************************************************************* //

// *****       MÉTHODES POUR METTRE A JOUR LES CHAMPS 'SELECT' (AVEC PLAGE DE DATE) DU FORMULAIRE DE RECHERCHE      ***** //

// ************************************************************************************************* //


getNewZone(name_specie: string, date2Begin: string, date2End: string): Observable<Fish[]> {

  return this.http.get<Fish[]>('http://localhost:3000/api/newZone/' + name_specie + '&' + date2Begin + '&' + date2End)
    .pipe(
      catchError(this.handleError('getNewZone', [])
    ),
  );
};

getNewNameSp(zone: string, date2Begin: string, date2End: string): Observable<Fish[]> {

  return this.http.get<Fish[]>('http://localhost:3000/api/newNameSp/' + zone + '&' + date2Begin + '&' + date2End)
  .pipe(
    catchError(this.handleError('getNewNameSp', [])
    ),
  );
};

getNewDate2(date2Begin: string, date2End: string): Observable<Fish[]> {

  return this.http.get<Fish[]>('http://localhost:3000/api/newDate2/' + date2Begin + '&' + date2End)
  .pipe(
    catchError(this.handleError('getNewDate2', [])
    ),
  );
};






// **************************************************************************************************************** //

// REQUETES GÉNÉRIQUES (POUR UN GRAPHIQUE DE BASE DANS LA METHODE 'ONINIT' - CF : LES DIFFÉRENTS 'CHART.COMPONENT') //

// **************************************************************************************************************** //

// MÉTHODE GÉNÉRALE (pas utilisée actuellement)

  // getAllFishes(): Observable<Fish[]> {
    
  //   return this.http.get<Fish[]>('http://localhost:3000/api/fishes');
  // }

// I> MÉTHODE POUR DATES-CHART (ONINIT)

  getAllFishingDates(): Observable<Fish[]> {

    return this.http.get<Fish[]>('http://localhost:3000/api/AllFishingDates')
      .pipe(
        catchError(this.handleError('getAllFishingDates', []))
      );
  }


  // II> MÉTHODE POUR SPECIES-CHART (ONINIT)
  getAllFishingSpecies(): Observable<Fish[]> {
    return this.http.get<Fish[]>('http://localhost:3000/api/AllFishingSpecies')
      .pipe(
        catchError(this.handleError('getAllFishingSpecies', [])
      ),
    );
  };


  // getAllFishingSpecies(date: string): Observable<Fish[]> {

  //   return this.http.get<Fish[]>('http://localhost:3000/api/AllFishingSpecies/' + date);
  // }


  // III> MÉTHODE POUR ZONES-CHART (ONINIT)

  getAllFishingZones(): Observable<Fish[]> {

    return this.http.get<Fish[]>('http://localhost:3000/api/AllFishingZones')
      .pipe(
        catchError(this.handleError('getAllFishingZones', [])
      ),
    );
  };

  // getAllFishingZones(date: string): Observable<Fish[]> {
  //   return this.http.get<Fish[]>('http://localhost:3000/api/AllFishingZones/' + date);
  // }



// *************************************************************************************

// RÉSULTATS DE REQUÊTES DE FORMULAIRE DE RECHERCHE SUR LES GRAPHIQUES
// MÉTHODE PAR 'END POINTS'

// *************************************************************************************



  // REQUÊTE 3 B : (SUBMIT)
  getAllZones(name_specie: string, zone: string, date: string): Observable<Fish[]> {

    return this.http.get<Fish[]>('http://localhost:3000/api/zones/' + name_specie + '&' + zone + '&' + date)
      .pipe(
        catchError(this.handleError('getAllZones', [])
      ),
    );
  };

  // REQUÊTE 3 A (test): (SUBMIT) // UTILISÉE DANS 'CHART-CHANGE-COMPONENT' (= TEST)
  getAllZonesTest(name_specie: string, zone: string, dateend: string): Observable<Fish[]> {
    
    return this.http.get<Fish[]>('http://localhost:3000/api/zones/' + name_specie + '&' + zone + '&' + dateend)
      .pipe(
        catchError(this.handleError('getAllZonesTest', [])
      ),
    );
  };



// ****************

  // REQUÊTE 2 : (SUBMIT)
  getAllSpecies(name_specie: string, zone: string, date: string): Observable<Fish[]> {

    return this.http.get<Fish[]>('http://localhost:3000/api/species/' + name_specie + '&' + zone + '&' + date)
      .pipe(
        catchError(this.handleError('getAllSpecies', [])
      ),
    );
  };



// ****************

// REQUÊTE 1 B : (SUBMIT)
  getAllDates(name_specie: string, zone: string, datebegin: string, dateend: string): Observable<Fish[]> {

    return this.http.get<Fish[]>('http://localhost:3000/api/dates/' + name_specie + '&' + zone + '&' + datebegin + '&' + dateend)
      .pipe(
        catchError(this.handleError('getAllDates', [])
      ),
    );
  };

// REQUÊTE 1 A : (SUBMIT) // UTILISÉE DANS 'CHART-CHANGE-COMPONENT' (= TEST)
  getOneSpecie(name_specie: string, zone: string, datebegin: string, dateend: string): Observable<Fish[]> {

    return this.http.get<Fish[]>('http://localhost:3000/api/fishes/' + name_specie + '&' + zone + '&' + datebegin + '&' + dateend)
      .pipe(
        catchError(this.handleError('getOneSpecie', [])
      ),
    );
  };



}
