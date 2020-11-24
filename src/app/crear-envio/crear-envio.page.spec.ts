import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearEnvioPage } from './crear-envio.page';

describe('CrearEnvioPage', () => {
  let component: CrearEnvioPage;
  let fixture: ComponentFixture<CrearEnvioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEnvioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearEnvioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
