import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleBodyComponent } from './modale-body.component';

describe('ModaleBodyComponent', () => {
  let component: ModaleBodyComponent;
  let fixture: ComponentFixture<ModaleBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaleBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaleBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
