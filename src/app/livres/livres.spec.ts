import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Livres } from './livres';

describe('Livres', () => {
  let component: Livres;
  let fixture: ComponentFixture<Livres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Livres]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Livres);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
