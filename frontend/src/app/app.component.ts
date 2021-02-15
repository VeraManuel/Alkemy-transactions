import { Component, OnInit } from '@angular/core';
import { TokenStorageService} from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  username: string;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();

      this.username = user.name + ' ' + user.lastname;
    }
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
