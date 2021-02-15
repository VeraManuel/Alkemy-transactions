import { Component, OnInit } from '@angular/core';
import { OperationService } from '../_services/operation.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {

  public token;
  public page = 1;
  public operations;
  public currentBalance;
  public currentOperation = null;
  public userId;
  public updatedOperation = {
    categoryId: '',
    concept: '',
    amount: '',
    dateOperation: '',
  }
  public message: any;
  public status: string;

  constructor(
    private operataionService : OperationService,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,
  ) 
  { 
    this.token = this.tokenStorage.getToken(); 
    this.userId = this.tokenStorage.getUser();
}

  ngOnInit(): void {
    this.getOperation(this.route.snapshot.paramMap.get('id'));
    this.getOperationsTotal(this.userId);
    this.getOperations(this.userId);
  }

  getOperation(id): void {
    this.operataionService.getOperation(this.token,id)
      .subscribe(
        data => {
          this.currentOperation = data;
          console.log(this.currentOperation);
          
        },
        error => {
          console.log(error);
          
        }
      )
  }

  getOperations(user) {
    this.operataionService.getOperations(this.token, this.page).subscribe(
      response => {
        console.log(response);
        
        if (response.operations) {
          this.operations = response.operations;
          console.log(this.operations);
        }
      },
      error => {
        console.log(error);
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
        }
        
      }
    )
  }

  getOperationsTotal(user) {
    this.operataionService.getOperationsTotal(this.token).subscribe(
      response => {
        this.currentBalance = response.money.rest;
      },
      error => {
        console.log(error);
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
        }
        
      }
    )
  }

  updateOperation(): void {
    this.operataionService.update(this.token, this.currentOperation.id, this.currentOperation)    
      .subscribe(
        response => {
          console.log(response);
          this.message = 'Transactions updated successfully';
          
        },
        error => {
          console.log(error);
          
        }
      )
  }

  deleteOperation(): void{
    this.operataionService.delete(this.token, this.currentOperation.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate['/transactions'];
          
        },
        error => {
          console.log(error);
          
        }
      )
  }

}
