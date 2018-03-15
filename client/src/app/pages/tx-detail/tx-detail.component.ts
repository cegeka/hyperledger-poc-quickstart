import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistoryService } from '../../services/history.service';

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

  constructor(private historyService: HistoryService, private route: ActivatedRoute) {
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
      if (jsonItem.key == 'transactionType' && jsonItem.value.substring('Buy') != -1) {
        this.addBuyTx();
      }
      if (jsonItem.key == '$class' && jsonItem.value.substring('SpendCoins') != -1) {
        this.addSpendCoinsTx();
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

  jsonContainsInfo(key: string) {
    for (let item of this.json) {
      return item.key == key;
    }
  }
}
