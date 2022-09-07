import { Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, Subscription, switchMap, Observable } from 'rxjs';
import { Ibeer } from '../shared/interfaces';
import { BeersService } from './beers.service';

@Injectable({
  providedIn: 'root',
})
export class WatchService {
  private readonly searchSubject = new Subject<string>();
  private readonly listFoodSubject = new Subject<Ibeer[]>();
  searchSubscription?: Subscription;

  searchResults: Ibeer[] = [];

  constructor(public restApi: BeersService) {}

  watchSearchInput(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(searchQuery => this.restApi.getBeersByFood(searchQuery))
      )
      .subscribe(results => {
        this.searchResults = results;
        this.listFoodSubject.next(this.searchResults);
      });
  }

  onSearchQueryInput(event: string): void {
    const searchQuery = event;
    this.searchSubject.next(searchQuery?.trim());
  }

  watchListFood(): Observable<Ibeer[]> {
    return this.listFoodSubject.asObservable();
  }
}
