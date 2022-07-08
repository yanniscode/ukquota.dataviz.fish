import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumInfosComponent } from './medium-infos.component';

describe('MediumInfosComponent', () => {
  let component: MediumInfosComponent;
  let fixture: ComponentFixture<MediumInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediumInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
