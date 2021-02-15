import { Component, OnInit, Input } from '@angular/core';
import { OperationService } from '../_services/operation.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  public token;
  public operationList: any;
  public currentBalance;
  public currentOperation = null;
  public userId;
  public status: string;
  public currentIndex = -1;
  @Input() user: string;


  constructor(
    private operataionService : OperationService,
    private tokenStorage: TokenStorageService,
  ) 
  { 
    this.token = this.tokenStorage.getToken(); 
    this.userId = this.tokenStorage.getUser();
}

  ngOnInit(): void {
    this.retrieveOperations();
    this.getOperationsTotal(this.user)
  }

  retrieveOperations(): void {
    this.operataionService.getOperations(this.token)
      .subscribe(
        data => {
          const { operations } = data
          this.operationList = operations;
          console.log(operations);
          
        },
        error => {
          console.log(error);
    });
  }

  refreshList(): void {
    this.retrieveOperations();
    this.currentOperation = null;
    this.currentIndex = -1;
  }

  setActiveOperation(operation, index): void {
    this.currentOperation = operation;
    this.currentIndex = index;
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

}


