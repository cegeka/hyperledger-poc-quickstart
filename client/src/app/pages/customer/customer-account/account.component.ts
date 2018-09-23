import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, UserRole } from '../../../services/user.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  private customers = [];

  processing: boolean;
  UserRole = UserRole; // used in the HTML ngIf conditions
  monitorUrl: string;

  constructor(private userService: UserService, private router: Router) {
    this.monitorUrl = environment.MonitorUrl;
  }

  ngOnInit() {
    if (!this.userService.loggedInUser) {
      this.router.navigate(['/login']);
      window.location.reload();
    }
    
    this.userService.getCustomers().subscribe(results => this.customers = results);
  } 
  
  updateAccount(id: string, password: string, firstName: string, lastName: string) {
    var spinner = document.getElementById("spinner1");
    spinner.style.display = "block"; 
    this.userService.updateAccount(id, password, firstName, lastName).subscribe(() => {
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
