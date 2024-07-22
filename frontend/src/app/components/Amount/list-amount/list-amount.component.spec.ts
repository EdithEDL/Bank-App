import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAmountComponent } from './list-amount.component';

describe('ListAmountComponent', () => {
  let component: ListAmountComponent;
  let fixture: ComponentFixture<ListAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAmountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
