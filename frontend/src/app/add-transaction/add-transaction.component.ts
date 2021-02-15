import { Component, OnInit,Input } from '@angular/core';
import { OperationService } from '../_services/operation.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
})
export class AddTransactionComponent implements OnInit {

  public operation = {
    userId: '',
    categoryId:'',
    concept: '',
    type: '',
    amount: '',
    dateOperation: ''
  };
  public submitted = false;
  public userId;
  public token;
  public status: string;
  @Input() user: string;

  constructor(
    private operataionService : OperationService,
    private tokenStorage: TokenStorageService,
  ) { 
  this.token = this.tokenStorage.getToken(); 
  this.userId = this.tokenStorage.getUser();
}

  ngOnInit(): void {
  }

  saveOperation(user): void {
    const data = {
      userId: this.userId,
      categoryId: this.operation.categoryId,
      concept: this.operation.concept,
      type: this.operation.type,
      amount: this.operation.amount,
      dateOperation: this.operation.dateOperation,
    }

    this.operataionService.create(this.token,data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          
        },
        error => {
          console.log(error);
          
        }
      )
  }

  newOperation(user): void {
    this.submitted = false;
    this.operation = {
      userId: this.userId,
      categoryId:'',
      concept: '',
      type: '',
      amount: '',
      dateOperation: ''
    }
  }

}
