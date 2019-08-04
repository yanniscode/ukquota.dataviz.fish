import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletMapCleanComponent } from './leaflet-map-clean.component';

describe('LeafletMapCleanComponent', () => {
  let component: LeafletMapCleanComponent;
  let fixture: ComponentFixture<LeafletMapCleanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafletMapCleanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafletMapCleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
