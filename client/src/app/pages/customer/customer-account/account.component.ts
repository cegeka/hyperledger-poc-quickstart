import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, UserRole } from '../../../services/user.service';
import { environment } from '../../../../environments/environment';


import { DialogService } from "ng2-bootstrap-modal";
import { UpdateAccountComponent } from '../../../components/modal/update-account.component';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  private customers = [];
  confirmResult:boolean = null;

  processing: boolean;
  UserRole = UserRole; // used in the HTML ngIf conditions
  monitorUrl: string;

  constructor(private userService: UserService, private router: Router, private dialogService: DialogService) {
    this.monitorUrl = environment.MonitorUrl;
  }

  ngOnInit() {
    if (!this.userService.loggedInUser) {
      this.router.navigate(['/login']);
      window.location.reload();
    }
    
    this.userService.getCustomers().subscribe(results => this.customers = results);
  } 
  
  updateAccount(id: string, firstName: string, lastName: string) {
    var spinner = document.getElementById("spinner1");
    spinner.style.display = "block"; 
    this.userService.updateAccount(id, firstName, lastName).subscribe(() => {
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



  // Update user modal
  showUpdateAccountModal() {
    let disposable = this.dialogService.addDialog(UpdateAccountComponent, {
      title:'Confirm title', 
      message:'Confirm message'})
      .subscribe((isConfirmed)=>{
        //Get dialog result
        this.confirmResult = isConfirmed;
      });
      //We can close dialog calling disposable.unsubscribe();
      //If dialog was not closed manually close it by timeout
      setTimeout(()=>{
        disposable.unsubscribe();
      },10000);
  }


  

}
