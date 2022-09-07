import { Component, OnInit, OnDestroy } from '@angular/core';
import { WatchService } from '../../services/watch.service';
import { BeersService } from '../../services/beers.service';
import { Ibeer } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  value: string = '';

  isLoading: boolean = false;

  foodList: string[] = [];

  constructor(public restApi: BeersService, private watch: WatchService) {}

  ngOnInit() {
    this.loadFoodBeers();
    this.watch.watchSearchInput();
    this.watch.watchListFood().subscribe((data: Ibeer[]) => {
      this.handledResponse(data);
    });
  }

  loadFoodBeers() {
    this.isLoading = true;
    return this.restApi.getBeersByFood().subscribe((data: Ibeer[]) => {
      this.handledResponse(data);
      this.isLoading = false;
    });
  }

  handledResponse(data: Ibeer[]) {
    const organizedData = data.map(({ food_pairing }) => food_pairing).flat();
    this.foodList = organizedData;
  }

  onSearchInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.watch.onSearchQueryInput(searchQuery);
  }

  clearSearchField() {
    this.value = '';
    this.loadFoodBeers();
  }

  ngOnDestroy(): void {
    this.watch.searchSubscription?.unsubscribe();
  }
}
