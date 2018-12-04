import { AssetService } from './../../../services/asset.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  tradeables = [];
  customers = [];
  otherCustomers = [];
  assetCopy: any = {}; 

  constructor(private userService: UserService, private assetService: AssetService, private router: Router) {
  }

  ngOnInit() {
    if (!this.userService.loggedInUser) {
      this.router.navigate(['/login']);
      return;
    }  

    this.loadTradeables();
    this.userService.getCustomers().subscribe(results => {
      this.customers = results;
      this.otherCustomers = results.filter(c => c.customerId != this.userService.loggedInUserName);
    });    
  }

  private loadTradeables() {
    this.tradeables = [];
    this.assetService.getTradeables().subscribe(results => this.tradeables = results.filter(t => t.owner == this.userService.loggedInUserName));
  }


  copyAssetData(asset: any) {
    this.assetCopy = {
      assetId: asset.assetId,
      description: asset.description,
      owner: asset.owner,
      newOwner: undefined //synthetic property
    };
  }

  createTradeable(assetId: string, description: string, owner: string) {
    var spinner = document.getElementById("spinner-trade");
    spinner.style.display = "block"; 
    this.assetService.createTradeable(assetId, description, owner).subscribe(() => {
      this.loadTradeables();
      
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
      this.loadTradeables();
      
      setTimeout( () => { 
        spinner.style.display = "none";
        document.getElementById('alert-success-update').style.display = 'block';
      }, 2000 );

      setTimeout( () => { 
        document.getElementById('alert-success-update').style.display = 'none';
      }, 7000 );

    });
  }

  tradeCommodity(tradeable: string, sender: string, newOwner: string) {
    var spinner = document.getElementById("spinner-trade");
    spinner.style.display = "block"; 
    this.assetService.tradeCommodity("resource:com.cegeka.Tradeable#" + tradeable, sender, newOwner).subscribe(() => {
      this.loadTradeables();

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
