import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TransactionComponent } from './components/transaction/transaction.component';

import { AuthInterceptorProviders } from './_helpers/auth.interceptor';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { TransactionDetailComponent } from './components/transaction-detail/transaction-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    TransactionComponent,
    AddTransactionComponent,
    TransactionDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [AuthInterceptorProviders, AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
