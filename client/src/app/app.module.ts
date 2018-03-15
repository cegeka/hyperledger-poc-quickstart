import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatSortModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { BlockchainComponent } from './pages/blockchain/blockchain.component';
import { TxDetailComponent } from './pages/tx-detail/tx-detail.component';
import { BlockchainLandingComponent } from './pages/blockchain-landing/blockchain-landing.component';

import { UserService } from './services/user.service';
import { HistoryService } from './services/history.service';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { BannerComponent } from './components/banner/banner.component';

import { Asset } from './dto/asset.dto';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BlockchainComponent,
    TxDetailComponent,
    SpinnerComponent,
    BannerComponent,
    BlockchainLandingComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  providers: [UserService, HistoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
