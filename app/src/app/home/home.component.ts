import {Component, NgModule, OnInit} from '@angular/core';
import {CalendarModule } from 'angular-calendar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }
}

@NgModule({
  imports: [
    CalendarModule.forRoot(,20);
  ]
})
class MyModule {}
