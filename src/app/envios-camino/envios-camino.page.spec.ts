import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnviosCaminoPage } from './envios-camino.page';

describe('EnviosCaminoPage', () => {
  let component: EnviosCaminoPage;
  let fixture: ComponentFixture<EnviosCaminoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviosCaminoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnviosCaminoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
