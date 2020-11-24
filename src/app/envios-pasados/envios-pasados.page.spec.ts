import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnviosPasadosPage } from './envios-pasados.page';

describe('EnviosPasadosPage', () => {
  let component: EnviosPasadosPage;
  let fixture: ComponentFixture<EnviosPasadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviosPasadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnviosPasadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
