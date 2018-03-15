import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-blockchain-landing',
  templateUrl: './blockchain-landing.component.html',
  styleUrls: ['./blockchain-landing.component.css']
})
export class BlockchainLandingComponent implements OnInit {
  monitorUrl: string;
  constructor() {
    this.monitorUrl = environment.MonitorUrl;
  }

  ngOnInit() {
  }

}
