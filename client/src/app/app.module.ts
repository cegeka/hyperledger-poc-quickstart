import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule, MatSortModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { FilterPipe } from './pipes/filter.pipe';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/admin/admin-home/home.component';
import { CustomerComponent } from './pages/customer/customer-home/customer.component';
import { AccountComponent } from './pages/customer/customer-account/account.component';
import { AssetsComponent } from './pages/customer/customer-assets/assets.component';
import { BlockchainComponent } from './pages/blockchain/blockchain.component';
import { TxDetailComponent } from './pages/tx-detail/tx-detail.component';

import { UserService } from './services/user.service';
import { AssetService } from './services/asset.service';
import { HistoryService } from './services/history.service';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { BannerComponent } from './components/banner/banner.component';
import { UpdateCustomerComponent } from './components/modal/update-customer.component';
import { UpdateAccountComponent } from './components/modal/update-account.component';
import { DeleteCustomerComponent } from './components/modal/delete-customer.component';
import { TransferAssetComponent } from './components/modal/transfer-asset.component';
import { UpdateAssetComponent } from './components/modal/update-asset.component';
import { CreateAssetComponent } from './components/modal/create-asset.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CustomerComponent,
    AccountComponent,
    AssetsComponent,
    BlockchainComponent,
    TxDetailComponent,
    SpinnerComponent,
    BannerComponent,
    UpdateCustomerComponent,
    DeleteCustomerComponent,
    UpdateAccountComponent,
    TransferAssetComponent,
    UpdateAssetComponent,
    CreateAssetComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    BootstrapModalModule,
  ],
  //Don't forget to add the component to entryComponents section
  entryComponents: [
    UpdateCustomerComponent,
    UpdateAccountComponent,
    DeleteCustomerComponent,
    TransferAssetComponent,
    UpdateAssetComponent,
    CreateAssetComponent
  ],
  providers: [UserService, HistoryService, AssetService],
  exports: [
    FilterPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
