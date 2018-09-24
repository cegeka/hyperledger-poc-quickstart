import { AssetService } from './../../../services/asset.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, UserRole } from '../../../services/user.service';
import { environment } from '../../../../environments/environment';
import { FilterPipe } from '../../../pipes/filter.pipe';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  private tradeables = [];
  private customers = [];

  processing: boolean;
  UserRole = UserRole; // used in the HTML ngIf conditions
  monitorUrl: string;
  

  constructor(private userService: UserService, private assetService: AssetService, private router: Router) {
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



}
