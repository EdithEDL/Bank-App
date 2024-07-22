import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInterestComponent } from './lista-interest.component';

describe('ListaInterestComponent', () => {
  let component: ListaInterestComponent;
  let fixture: ComponentFixture<ListaInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaInterestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
