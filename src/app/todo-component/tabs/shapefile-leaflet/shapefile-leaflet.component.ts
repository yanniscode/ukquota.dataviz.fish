// import { Component, OnInit } from '@angular/core';

// // import * as L from 'leaflet';
// // IMPORT À LA BASE :
// import 'leaflet'; // MARCHE
// declare let L;

// import * as shp from 'shpjs';

// @Component({
//   selector: 'app-shapefile-leaflet',
//   templateUrl: './shapefile-leaflet.component.html',
//   styleUrls: ['./shapefile-leaflet.component.scss']
// })
// export class ShapefileLeafletComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {

//   // const geoJson = geoJson;

//   const m = L.map('map').setView([34.74161249883172, 18.6328125], 2);

//     const geo = L.geoJSON({features: []}, { onEachFeature: function popUp(f, l) {
//     const out = [];
//     if (f.properties) {
//       for (const key of Object.keys(f.properties)) {
//         out.push(key + ' : ' + f.properties[key]);
//       }
//       l.bindPopup(out.join('<br />'));
//     }
//   }}).addTo(m);

//     // const base = 'assets/ICES_areas.zip'; // test perso avec sous-zones maritimes (pour sakana)
//     const base = 'assets/TM_WORLD_BORDERS_SIMPL-0.3.zip';

//     shp(base).then(function(data) {
//         geo.addData(data);
//     });

//   }

// }
