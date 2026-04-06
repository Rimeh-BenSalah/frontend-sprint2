import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLivre } from './add-livre';

describe('AddLivre', () => {
  let component: AddLivre;
  let fixture: ComponentFixture<AddLivre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLivre]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLivre);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
