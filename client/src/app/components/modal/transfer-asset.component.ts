import { AssetService } from './../../services/asset.service';
import { Component, ViewChild } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { UserService, UserRole } from '../../services/user.service';

export interface TransferAssetModel {
  title:string;
  message:string;
}
@Component({  
 
    selector: 'confirm',
    template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">Update user</h4>
                   </div>
                   <div class="modal-body">
                            <div class="form-group">
                                <label for="tradeable">Asset ID</label>
                                <input id="tradeable" type="text" class="form-control" #tradeable>
                            </div>
                            <div class="form-group">
                                <label for="newOwner">New Owner</label>
                                <select class="form-control" id="newOwner" #newOwner>
                                    <option *ngFor="let customer of customers; let i = index;">
                                        <div *ngIf="customer.customerId !== this.userService.loggedInUserName">
                                            {{customer.customerId}}
                                        </div>
                                    </option>
                                </select>
                            </div>
                            <div class="form-group" style="visibility: hidden; display: none;">
                                <label for="sender">Sender</label>
                                <input id="sender" type="text" class="form-control" value="{{ this.userService.loggedInUserName }}" #sender>
                            </div>   
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button (click) = "tradeCommodity(tradeable.value, sender.value, newOwner.value)" type="button" class="btn btn-primary" data-dismiss="modal">Transfer</button>
                        </div>
                 </div>
              </div>`
})


export class TransferAssetComponent extends DialogComponent<TransferAssetModel, boolean> implements TransferAssetModel {
  title: string;
  message: string;
  private tradeables = [];
  private customers = [];

  constructor(dialogService: DialogService, private assetService: AssetService, private userService: UserService) {
    super(dialogService);

  }

  ngOnInit() {
   this.userService.getCustomers().subscribe(results => this.customers = results);
    
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
  

  
    this.close();

  }


  


}