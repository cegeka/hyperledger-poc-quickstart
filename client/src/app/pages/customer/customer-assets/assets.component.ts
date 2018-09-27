import { AssetService } from './../../../services/asset.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, UserRole } from '../../../services/user.service';
import { environment } from '../../../../environments/environment';
import { FilterPipe } from '../../../pipes/filter.pipe';

import { DialogService } from "ng2-bootstrap-modal";
import { TransferAssetComponent } from '../../../components/modal/transfer-asset.component';
import { UpdateAssetComponent } from '../../../components/modal/update-asset.component';
import { CreateAssetComponent } from '../../../components/modal/create-asset.component';


@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  private tradeables = [];
  private customers = [];
  confirmResult:boolean = null;

  processing: boolean;
  UserRole = UserRole; // used in the HTML ngIf conditions
  monitorUrl: string;
  

  constructor(private userService: UserService, private assetService: AssetService, private router: Router, private dialogService: DialogService) {
    this.monitorUrl = environment.MonitorUrl;
  }

  ngOnInit() {
    if (!this.userService.loggedInUser) {
      this.router.navigate(['/login']);
    }  

    this.assetService.getTradeables().subscribe(results => this.tradeables = results);
    this.userService.getCustomers().subscribe(results => this.customers = results);
    
  }

  createTradeable(assetId: string, description: string, owner: string) {
    var spinner = document.getElementById("spinner-trade");
    spinner.style.display = "block"; 
    this.assetService.createTradeable(assetId, description, owner).subscribe(() => {
      this.assetService.getTradeables().subscribe(results => this.tradeables = results);
      
      setTimeout( () => { 
        spinner.style.display = "none";
        document.getElementById('alert-success-trade').style.display = 'block';
      }, 2000 );

      setTimeout( () => { 
        document.getElementById('alert-success-trade').style.display = 'none';
      }, 7000 );

    });

  }

  updateTradeable(id: string, description: string, owner: string) {
    var spinner = document.getElementById("spinner-trade");
    spinner.style.display = "block"; 
    this.assetService.updateTradeable(id, description, owner).subscribe(() => {
      this.assetService.getTradeables().subscribe(results => this.tradeables = results);
      
      setTimeout( () => { 
        spinner.style.display = "none";
        document.getElementById('alert-success-trade').style.display = 'block';
      }, 2000 );

      setTimeout( () => { 
        document.getElementById('alert-success-trade').style.display = 'none';
      }, 7000 );

    });

  }



  tradeCommodity(tradeable: string, sender: string, newOwner: string) {
    var spinner = document.getElementById("spinner-trade");
    spinner.style.display = "block"; 
    this.assetService.tradeCommodity("resource:com.cegeka.Tradeable#" + tradeable, sender, newOwner).subscribe(() => {
    this.assetService.getTradeables().subscribe(results => this.tradeables = results);
      setTimeout( () => { 
        spinner.style.display = "none";
        document.getElementById('alert-success-transaction').style.display = 'block';
      }, 2000 );
      setTimeout( () => { 
        document.getElementById('alert-success-transaction').style.display = 'none';
      }, 7000 );
    });
  }


  // Transfer asset modal
  showTransferAssetModal() {
    let disposable = this.dialogService.addDialog(TransferAssetComponent, {
      title:'Transfer asset', 
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

  // Update user modal
  showUpdateAssetModal() {
    let disposable = this.dialogService.addDialog(UpdateAssetComponent, {
      title:'Update user', 
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

  // Create user modal
  showCreateAssetModal() {
    let disposable = this.dialogService.addDialog(UpdateAssetComponent, {
      title:'Create user', 
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
