import { Component, OnInit } from '@angular/core';
import { navItems } from './Admin-sidebar-data';
import { navItemsFarmer } from './Farmer-sidebar-data';
import { NavService } from '../../../services/nav.service';
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems = navItems;

  constructor(public navService: NavService, private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    let isadmin = false // await this.authService.isAdmin();
    //console.log(isadmin);
    console.log("user conencted", this.authService.userConnected);

    if (!isadmin) {
      this.navItems = navItemsFarmer
    }

  }
}
