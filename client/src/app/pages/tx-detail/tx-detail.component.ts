import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistoryService } from '../../services/history.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tx-detail',
  templateUrl: './tx-detail.component.html',
  styleUrls: ['./tx-detail.component.css']
})
export class TxDetailComponent implements OnInit {
  json: Array<any>;
  id: string;
  TransactionTypeKey = "transactionType";

  constructor(private historyService: HistoryService, private userService: UserService, private route: ActivatedRoute, private router: Router, private location: Location) {
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    if (!this.userService.loggedInUser) {
      this.router.navigate(['/login']);
    }
    
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.json = [];
    this.historyService.getTx(this.id).subscribe((response) => {
      for (let key in response) {
        this.json.push({ key: key, value: response[key] });
      }
      this.addSpecificTx();
    });
  }

  // Support for custom transaction types
  addSpecificTx() {
    for (let jsonItem of this.json) {
      if (jsonItem.key == this.TransactionTypeKey) {
        if(jsonItem.value.indexOf('Trade') != -1) {
          jsonItem.value = 'Asset transferred';
          this.addAssetTransferred();
        }
      }
    }
  }

  addAssetTransferred() {
    this.historyService.getAssetTransferredTx(this.id).subscribe(this.addAllFields.bind(this));
  }

  private addAllFields(response) {
    for (let key in response) {
      if (!this.jsonContainsInfo(key)) {
        this.json.push({ key: key, value: response[key] });
      }
    }
  }

  private jsonContainsInfo(key: string) {
    for (let item of this.json) {
      if(item.key == key) {
        return true;
      }
    }
    return false;
  }
}
