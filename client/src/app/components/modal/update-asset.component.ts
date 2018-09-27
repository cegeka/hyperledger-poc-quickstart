import { AssetService } from '../../services/asset.service';
import { Component, ViewChild } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { UserService, UserRole } from '../../services/user.service';

export interface UpdateAssetModel {
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
                                    <label for="assetId1">Asset ID</label>
                                    <input id="assetId1" type="text" class="form-control" #assetId1>
                                </div>
                                <div class="form-group">
                                    <label for="description1">Description</label>
                                    <input id="description1" type="text" class="form-control" #description1>
                                </div>
                                <div class="form-group" style="visibility: hidden; display: none;">
                                    <label for="owner1">Owner</label>
                                    <input id="owner1" type="text" class="form-control" value="{{ this.userService.loggedInUserName }}" #owner1>
                                </div>  
                            </form>     
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button (click) = "updateTradeable(assetId1.value, description1.value, owner1.value)" type="button" class="btn btn-primary" data-dismiss="modal">Update</button>
                        </div>
                 </div>
              </div>`
})


export class UpdateAssetComponent extends DialogComponent<UpdateAssetModel, boolean> implements UpdateAssetModel {
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

  
    this.close();

  }


  


}