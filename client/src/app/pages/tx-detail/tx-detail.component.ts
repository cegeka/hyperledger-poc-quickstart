import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistoryService } from '../../services/history.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tx-detail',
  templateUrl: './tx-detail.component.html',
  styleUrls: ['./tx-detail.component.css']
})
export class TxDetailComponent implements OnInit {
  tx: any
  json: Array<any>;
  id: string;
  private sub: any;
  TransactionTypeKey = "transactionType";

  constructor(private historyService: HistoryService, private route: ActivatedRoute, private location: Location) {
  }

  goBack() {
    // window.history.back();
    this.location.back();

    console.log( 'goBack()...' );
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.json = [];
    this.historyService.getTx(this.id).subscribe((response) => {
      this.tx = response;
      for (let key in this.tx) {
        this.json.push({ key: key, value: this.tx[key] });
      }
      this.addSpecificTx();
    });
  }

  // Support for custom transaction types
  addSpecificTx() {
    for (let jsonItem of this.json) {
      if (jsonItem.key == this.TransactionTypeKey) {
        if(jsonItem.value.indexOf('Buy') != -1) {
          //jsonItem.value = 'Buy items';
          this.addBuyTx();
        }
        if (jsonItem.value.indexOf('SpendCoins') != -1) {
          //jsonItem.value = 'SpendCoins';
          this.addSpendCoinsTx();
        }        
      }
    }
  }


  addBuyTx() {
    /*
    this.historyService.getBuyTx(this.id).subscribe((response) => {
      for (let key in response) {
        if (!this.jsonContainsInfo(key)) {
          this.json.push({ key: key, value: response[key] });
        }
      }
    });
    */
  }

  addSpendCoinsTx(){
    /*
    this.historyService.getSpendCoinsTx(this.id).subscribe((response) => {
      for (let key in response) {
        if (!this.jsonContainsInfo(key)) {
          this.json.push({ key: key, value: response[key] });
        }
      }
    });
    */
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
