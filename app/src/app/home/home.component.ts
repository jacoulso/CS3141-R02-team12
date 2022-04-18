import {Component, OnInit} from '@angular/core';
import { ApiserviceService } from '../apiservice.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private service:ApiserviceService) { }


  ngOnInit(): void {
    this.loadAllCalendars();
  }

  loadAllCalendars(): void {
    const ud = this.service.getUID();
    console.log(ud);
    this.service.getAllCalendars(ud).subscribe( (res) => {
      localStorage.setItem('user_cals', JSON.stringify(res.data));;
    })
  }

}
