import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BeersService } from './beers.service';

describe('BeersService', () => {
  let httpTestingController: HttpTestingController;
  let service: BeersService;
  const url = 'https://api.punkapi.com/v2/beers';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(BeersService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getBeers should use GET to retrieve data', () => {
    service.getBeers().subscribe();

    const testRequest = httpTestingController.expectOne(`${url}`);

    expect(testRequest.request.method).toEqual('GET');
  });
});
