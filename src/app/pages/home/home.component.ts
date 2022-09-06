import { Component, OnInit } from '@angular/core';
import { BeersService } from '../../services/beers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  value: string = '';

  isLoading: boolean = false;

  foodList: any = [];

  constructor(public restApi: BeersService) {}

  ngOnInit() {
    this.loadBeers();
  }

  loadBeers() {
    this.isLoading = true;
    return this.restApi.getBeers().subscribe((data: []) => {
      this.handledResponse(data);
      this.isLoading = false;
    });
  }

  handledResponse(data: []) {
    const organizedData = data.map(({ food_pairing }) => food_pairing).flat();
    this.foodList = organizedData;
  }
}
