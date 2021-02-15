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
  public page = 1;
  public count = 0;
  public pageSize = 10;
  public title ='';
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

  getRequestParams(page, pageSize): any {
    let params = {};

    if (page) {
      params[`page`] = page -1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveOperations(): void {

    const params = this.getRequestParams(this.page, this.pageSize);

    this.operataionService.getOperations(this.token,params)
      .subscribe(
        data => {;
          
          const { operations, totalOperations } = data
          this.operationList = operations;
          this.count = totalOperations;
          console.log(this.count);
          
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

  handlePageChange(event){
    console.log(event);
    
    this.page = event;
    this.retrieveOperations();
  }

}


