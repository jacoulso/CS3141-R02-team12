import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  displayName = '';

  constructor(private service:ApiserviceService, private router:Router) { }

  ngOnInit(): void {
    if (!this.service.isAuthenticated()) {
      this.logout();
    }
    this.displayName = this.getUsername();
  }

  logout(): void {
    this.service.logout();
    this.router.navigate(['/login'], {queryParams: { loggedOut: 'success' }});
  }
  
  getUsername(): string {
    return this.service.getUsername();
  }

}
