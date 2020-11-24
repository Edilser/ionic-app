import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeDelivery2Page } from './home-delivery2.page';

describe('HomeDelivery2Page', () => {
  let component: HomeDelivery2Page;
  let fixture: ComponentFixture<HomeDelivery2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDelivery2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeDelivery2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
