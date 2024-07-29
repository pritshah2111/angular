import { NestedTreeControl } from '@angular/cdk/tree';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { USER_DETAILS } from 'src/app/common/common-const';

export const Menu: MenuI[] = [
  {
    name: 'Dashboard',
    route: 'dashboard',
    icon: 'dashboard',
  },
  {
    name: 'School Management',
    route: 'schools',
    icon: 'school',
  },
  {
    name: 'Students Management',
    route: 'students',
    icon: 'person',
  },
  {
    name: 'Standards Management',
    route: 'standards',
    icon: 'local_library',
  }
];

export const MenuInvestor: MenuI[] = [
  {
    name: 'Dashboard',
    route: 'dashboard',
    icon: 'dashboard',
  },
  {
    name: 'Students Management',
    route: 'students',
    icon: 'person',
  },
  {
    name: 'Standards Management',
    route: 'standards',
    icon: 'local_library',
  }
];

export interface MenuI {
  name: string;
  route: string;
  icon: string;
  subMenu?: MenuI[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isExpanded: boolean = true;
  nameStore?: MenuI;
  treeControl = new NestedTreeControl<MenuI>((node) => node.subMenu);
  dataSource = new MatTreeNestedDataSource<MenuI>();

  constructor(@Inject(DOCUMENT) private document: Document) {
    let user_details: any = localStorage.getItem(USER_DETAILS);
    if (user_details) {
      if (JSON.parse(user_details).userRole === 'school') {
        this.dataSource.data = MenuInvestor;
      } else {
        this.dataSource.data = Menu;
      }
    }
  }

  ngOnInit(): void { }

  hasChild = (_: number, node: MenuI) =>
    !!node.subMenu && node.subMenu.length > 0;

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
    // this.sidebarState.expanded.next(this.isExpanded);
  }

  storeName(node: MenuI) {
    this.nameStore = node;
  }
}
