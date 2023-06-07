import { Injectable } from '@angular/core';

interface MenuItem {
  name?: string;
  icon?: string;
  route?: string;
  active?: boolean;
  children?: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor() {}

  getMenuItems(): MenuItem[] {
    return [
      {
        name: 'QUESTION',
        icon: 'fa fa-question',
        route: '#',
        children: [
          {
            name: 'ADD QUESTION',
            icon: 'far fa-circle',
            route: '/question/create'
          },
          {
            name: 'VIEW QUESTION',
            icon: 'far fa-circle',
            route: '/question/index'
          }
        ]
      }
    ];
  }
}
