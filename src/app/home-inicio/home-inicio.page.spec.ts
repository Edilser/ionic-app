import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeInicioPage } from './home-inicio.page';

describe('HomeInicioPage', () => {
  let component: HomeInicioPage;
  let fixture: ComponentFixture<HomeInicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeInicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeInicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
