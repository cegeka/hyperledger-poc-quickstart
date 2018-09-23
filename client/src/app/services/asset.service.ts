import { Router } from '@angular/router';
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseResourceService, HTTP_VERB } from './base-resource.service';

@Injectable()
export class AssetService extends BaseResourceService {

  getTradeables(): Observable<any> {
    return this.jsonRequest(`Tradeable`, HTTP_VERB.GET);
  }

  createTradeable(assetId: string, description: string, owner: string): Observable<any> {    
    return this.jsonRequest(`Tradeable`, HTTP_VERB.POST, {
      assetId: assetId,
      description: description,
      owner: owner 
    });
  }

  deleteTradeable(id: string): Observable<any> {    
    return this.jsonRequest(`Tradeable/${id}`, HTTP_VERB.DELETE, {
      id: id
    });
  }

  updateTradeable(id: string, description: string, owner: string): Observable<any> {    
    return this.jsonRequest(`Tradeable/${id}`, HTTP_VERB.PUT, {
      id: id,
      description: description,
      owner: owner 
    });
  }

  tradeCommodity(tradeable: string, sender: string, newOwner: string): Observable<any> {    
    return this.jsonRequest(`Trade`, HTTP_VERB.POST, {
      tradeable: tradeable,
      sender: sender,
      newOwner: newOwner
    });
  }

}
