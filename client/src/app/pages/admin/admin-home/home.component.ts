import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, UserRole } from '../../../services/user.service';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private customers = [];

  processing: boolean;
  UserRole = UserRole; // used in the HTML ngIf conditions
  monitorUrl: string;

  constructor(private userService: UserService, private router: Router) {
    this.monitorUrl = environment.MonitorUrl;
  }

  ngOnInit() {
    this.userService.getCustomers().subscribe(results => this.customers = results);
  }

  createCustomer(customerId: string, password: string, firstName: string, lastName: string) {
    var spinner = document.getElementById("spinner1");
    spinner.style.display = "block"; 
    this.userService.createCustomer(customerId, password, firstName, lastName).subscribe(() => {
    this.userService.getCustomers().subscribe(results => this.customers = results);
      setTimeout( () => { 
        spinner.style.display = "none";
        document.getElementById('alert-success1').style.display = 'block';
      }, 2000 );
      setTimeout( () => { 
        document.getElementById('alert-success').style.display = 'none';
      }, 7000 );
    });
  }

  updateCustomer(id: string, firstName: string, lastName: string) {
    var spinner = document.getElementById("spinner1");
    spinner.style.display = "block"; 
    this.userService.updateCustomer(id, firstName, lastName).subscribe(() => {
    this.userService.getCustomers().subscribe(results => this.customers = results);
      setTimeout( () => { 
        spinner.style.display = "none";
        document.getElementById('alert-success1').style.display = 'block';
      }, 2000 );
      setTimeout( () => { 
        document.getElementById('alert-success').style.display = 'none';
      }, 7000 );
    });
  }

  deleteCustomer(id: string) {
    var spinner = document.getElementById("spinner1");
    spinner.style.display = "block"; 
    this.userService.deleteCustomer(id).subscribe(() => {
    this.userService.getCustomers().subscribe(results => this.customers = results);
      setTimeout( () => { 
        spinner.style.display = "none";
        document.getElementById('alert-success1').style.display = 'block';
      }, 2000 );
      setTimeout( () => { 
        document.getElementById('alert-success').style.display = 'none';
      }, 7000 );
    });
  }

}
