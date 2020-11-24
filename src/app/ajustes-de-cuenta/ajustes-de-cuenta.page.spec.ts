import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjustesDeCuentaPage } from './ajustes-de-cuenta.page';

describe('AjustesDeCuentaPage', () => {
  let component: AjustesDeCuentaPage;
  let fixture: ComponentFixture<AjustesDeCuentaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjustesDeCuentaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjustesDeCuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
