import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  userSubs = new Subscription();

  constructor(private dataStoreService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubs = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  onSave() {
    this.dataStoreService.storeData();
  }

  onLogout() {
    this.authService.logOut();
  }

  onFetch() {
    this.dataStoreService.fetchData().subscribe();
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }
}
