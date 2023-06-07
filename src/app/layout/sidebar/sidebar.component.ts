import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MenuService} from "../../core/services/menu.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems: any[] = [];

  constructor(private router: Router, private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuItems = this.menuService.getMenuItems();
    this.setMenuItemActive();
  }

  setMenuItemActive() {
    const activeRoute = window.location.hash || window.location.pathname;

    this.menuItems.forEach(menuItem => {
      menuItem.active = false;
      if (menuItem.children && menuItem.children.length > 0) {
        menuItem.children.forEach((childItem: any) => {
          if (childItem.route === activeRoute) {
            childItem.active = true;
            menuItem.active = true;
            menuItem.menuOpen = true;
          } else {
            childItem.active = false;
          }
        });
      } else {
        if (menuItem.route === activeRoute) {
          menuItem.active = true;
        }
      }
    });
  }
}
