import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { SharedService } from 'src/app/auth/service/shared.service';
import { USER_DETAILS } from 'src/app/common/common-const';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loginUserDetails: any;
  constructor(
    private authenticationService: AuthService,
    public shared: SharedService,
  ) { }

  ngOnInit(): void {
    this.profileData();
    this.shared.listen().subscribe((data: any) => {
      if (data == 'profile') {
        this.profileData();
      }
    });
  }

  profileData() {
    let user_details: any = localStorage.getItem(USER_DETAILS);
    console.log('user_details: ', user_details);
    if (user_details) {
      this.loginUserDetails = JSON.parse(user_details);
      this.loginUserDetails.logoName = this.loginUserDetails.name.charAt(0).toUpperCase()
    }
  }

  logout() {
    this.authenticationService.logout();
  }
}
