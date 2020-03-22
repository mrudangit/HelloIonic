import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Fx.TilesComponent } from './fx.tiles.component';

describe('Fx.TilesComponent', () => {
  let component: Fx.TilesComponent;
  let fixture: ComponentFixture<Fx.TilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Fx.TilesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Fx.TilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
