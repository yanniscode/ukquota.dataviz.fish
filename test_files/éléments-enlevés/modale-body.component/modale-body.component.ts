// import { Component, OnChanges, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


// @Component({
//   selector: 'app-modale-body',
//   templateUrl: './modale-body.component.html',
//   styleUrls: ['./modale-body.component.scss'],
//   providers: [
//   ]
// })


// export class ModaleBodyComponent implements OnChanges, OnInit, OnDestroy {

//   data: any;

//   constructor(
//     private modalService: NgbModal,
//   ) {}


//   ngOnChanges(content): void {

//     // setTimeout(() => {
//       this.modalService.open(content, { ariaLabelledBy: 'lineChartModale' }).result.then((result) => {
//         this.closeResult = `Closed with: ${result}`;
//       }, (reason) => {
//         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//       });
//     // }, 1000);

//   }


//   ngOnInit(): void {
//     console.log("ngOnInit() de 'modal-body'.");
//   }


//   ngOnDestroy(): void {
//     // $("body>#content").remove(); // jquery = nécessaire ?? (à éviter avec Angular...)
//     this.data = null;
//     console.log("ngOnDestroy()");
//   }


// // prise en compte des différents moyens de fermeture de la modale: (ESC, BackDrop Click, 2 boutons)
//   closeResult = '';

//   private getDismissReason(reason: any): string {

//     if (reason === ModalDismissReasons.ESC) {
//       this.ngOnDestroy();
//       return 'by pressing ESC';

//     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//       this.ngOnDestroy();
//       return 'by clicking on a backdrop';

//     } else {
//       this.ngOnDestroy();
//       return `with: ${reason}`;
//     }

//   }
  

// }