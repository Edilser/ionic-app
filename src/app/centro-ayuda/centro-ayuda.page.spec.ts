import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CentroAyudaPage } from './centro-ayuda.page';

describe('CentroAyudaPage', () => {
  let component: CentroAyudaPage;
  let fixture: ComponentFixture<CentroAyudaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroAyudaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CentroAyudaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
