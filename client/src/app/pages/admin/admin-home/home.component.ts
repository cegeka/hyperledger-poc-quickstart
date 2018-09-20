import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, UserRole } from '../../../services/user.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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

}
