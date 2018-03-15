import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, UserRole } from '../../services/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  processing: boolean;
  reduction: any;
  UserRole = UserRole; // used in the HTML ngIf conditions
  loyaltyCard: any;
  monitorUrl: string;

  constructor(private userService: UserService, private router: Router) {
    this.monitorUrl = environment.MonitorUrl;
  }

  ngOnInit() {    
  }

  navigate() {
    if (this.userService.loggedInRole == UserRole.Customer) {
      this.router.navigate(['/customer']);
    }
    else if (this.userService.loggedInRole == UserRole.Shop) {
      this.router.navigate(['/shop'])
    }
    else if (this.userService.loggedInRole == UserRole.Admin) {
      this.router.navigate(['admin'])
    }
    else {
      this.router.navigate(['/login'])
    }
  }
}
