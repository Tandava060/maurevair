import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'maurevair';

  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.authService.refreshUser();
  }
  
}
