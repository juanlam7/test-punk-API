import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { BeersService } from '../../services/beers.service';
import { HomeComponent } from './home.component';
import { AppModule } from '../../app.module';

const RESPONSE = [
  {
    id: 1,
    name: 'test 1',
    food_pairing: ['Spicy chicken tikka masala', 'Grilled chicken quesadilla', 'Caramel toffee cake'],
  },
  {
    id: 2,
    name: 'test 2',
    food_pairing: [
      'Fresh crab with lemon',
      'Garlic butter dipping sauce',
      'Goats cheese salad',
      'Creamy lemon bar doused in powdered sugar',
    ],
  },
];

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: BeersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: BeersService,
          useValue: {
            getBeersByFood() {
              return of(RESPONSE);
            },
          },
        },
      ],
      imports: [HttpClientTestingModule, AppModule],
    }).compileComponents();

    service = TestBed.inject(BeersService);
    jest.spyOn(service, 'getBeersByFood');
  });

  it('should create', waitForAsync(async () => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    expect(component).toBeTruthy();
  }));
});
