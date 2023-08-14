import {Component, OnInit} from '@angular/core';
import {MainService} from "./main.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  flights: any

  constructor(public mainService: MainService) {
  }

  ngOnInit(): void {
    this.mainService.flight.subscribe((response) => {
      this.flights = response
    })
  }

}
