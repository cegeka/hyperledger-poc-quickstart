import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { FilterPipe } from './pipes/filter.pipe';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/admin/admin-home/home.component';
import { CustomerComponent } from './pages/customer/customer-home/customer.component';
import { AssetsComponent } from './pages/customer/customer-assets/assets.component';
import { AccountComponent } from './pages/customer/customer-account/account.component';
import { BlockchainComponent } from './pages/blockchain/blockchain.component';
import { TxDetailComponent } from './pages/tx-detail/tx-detail.component';

import { UserService } from './services/user.service';
import { AssetService } from './services/asset.service';
import { HistoryService } from './services/history.service';

import { BannerComponent } from './components/banner/banner.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CustomerComponent,
    AssetsComponent,
    AccountComponent,
    BlockchainComponent,
    TxDetailComponent,
    BannerComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule,
    BootstrapModalModule,
  ],
  providers: [UserService, HistoryService, AssetService],
  exports: [
    FilterPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
