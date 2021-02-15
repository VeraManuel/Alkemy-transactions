import { Component, OnInit, Input } from '@angular/core';
import { OperationService } from '../_services/operation.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public token;
  public page = 1;
  public operations;
  public currentBalance;
  public status: string;
  @Input() user: string;

  constructor (
    private operataionService : OperationService,
    private tokenStorage: TokenStorageService,
    ) {
      this.token = this.tokenStorage.getToken();
    }

  ngOnInit(): void { 
    this.getOperationsTotal(this.user);

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

}
