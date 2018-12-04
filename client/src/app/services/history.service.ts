import { Observable } from "rxjs/Observable";
import { Injectable } from '@angular/core';
import { BaseResourceService, HTTP_VERB } from './base-resource.service';

@Injectable()
export class HistoryService extends BaseResourceService {

  getBlockchainOverview(): Observable<any> {
    return this.jsonRequest('system/historian', HTTP_VERB.GET);
  }

  getTx(transactionId: string): Observable<any> {
    return this.jsonRequest(`system/historian/${transactionId}`, HTTP_VERB.GET);
  }

  getAssetTransferredTx(transactionId: string): Observable<any> {
    return this.jsonRequest(`Trade/${transactionId}`, HTTP_VERB.GET);
  }
}
