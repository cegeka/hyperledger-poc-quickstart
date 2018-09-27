import { AssetService } from '../../services/asset.service';
import { Component, ViewChild } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { UserService, UserRole } from '../../services/user.service';

export interface CreateAssetModel {
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
                            <form>
                                <div class="form-group">
                                    <label for="assetId">Asset ID</label>
                                    <input id="assetId" type="text" class="form-control" #assetId>
                                </div>
                                <div class="form-group">
                                    <label for="description">Description</label>
                                    <input id="description" type="text" class="form-control" #description>
                                </div>
                                <div class="form-group" style="visibility: hidden; display: none;">
                                    <label for="owner">Owner</label>
                                    <input id="owner" type="text" class="form-control" value="{{ this.userService.loggedInUserName }}" #owner>
                                </div>  
                            </form>     
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button (click) = "createTradeable(assetId.value, description.value, owner.value)" type="button" class="btn btn-primary" data-dismiss="modal">Create</button>
                        </div>
                 </div>
              </div>`
})


export class CreateAssetComponent extends DialogComponent<CreateAssetModel, boolean> implements CreateAssetModel {
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