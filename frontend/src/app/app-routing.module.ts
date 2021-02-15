import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent} from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { TransactionDetailComponent } from './components/transaction-detail/transaction-detail.component';
import { TransactionComponent } from './components/transaction/transaction.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'add', component: AddTransactionComponent},
  {path: 'transactions', component: TransactionComponent},
  {path: 'transactions?page=1', component: TransactionComponent},
  {path: 'transaction/:id', component: TransactionDetailComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
