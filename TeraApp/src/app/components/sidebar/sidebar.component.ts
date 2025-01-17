import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuService } from '../../Services/menu.service';
import { navItems } from './navItems';
import { MenuMaster } from '../../../../Models/type';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() isSidebarVisible: boolean = true;
  navItems: MenuMaster[] = [];
  groupedNavItems: {
    parent: string;
    link?: string;
    isOpen: boolean;
    items: any[];
  }[] = [];

  constructor(private menuService: MenuService, private router: Router) {}

  ngOnInit(): void {
    this.loadNavItems();
  }
  loadNavItems() {
    this.menuService.getAllMenus().subscribe((data) => {
      this.navItems = data;
      console.log(this.navItems);
      this.groupedNavItems = this.groupByParent(this.navItems);
      console.log(this.groupedNavItems);
    });
  }

  groupByParent(items: any[]): {
    parent: string;
    isOpen: boolean;
    link?: string;
    items: any[];
  }[] {
    const groups: {
      parent: string;
      isOpen: boolean;
      link?: string;
      items: any[];
    }[] = [];

    // Identify top-level items (Case 1 and Case 2)
    const topLevels = items.filter((item) => item.parentId === null);
    topLevels.forEach((topLevel) => {
      const group: any = {
        parent: topLevel.menuTitle,
        link: topLevel.link || undefined,
        isOpen: false,
        items: [],
      };

      // Add direct children or items with links (Case 1)
      const childItems = items.filter(
        (item) => item.parentId === topLevel.id && (item.link || item.parentId) // Include items with links or children
      );

      group.items = childItems.map((child) => ({
        title: child.menuTitle,
        link: child.link || undefined,
        icon: child.icon || '',
        items: [], // Placeholder for sub-items
      }));

      // Case 3: Process nested sub-items
      group.items.forEach((item: any) => {
        const subItems = items.filter(
          (subItem) =>
            subItem.parentId ===
            items.find((i) => i.menuTitle === item.title)?.id
        );
        if (subItems.length > 0) {
          item.items = subItems.map((subItem) => ({
            title: subItem.menuTitle,
            link: subItem.link,
            icon: subItem.icon || '',
          }));
        }
      });

      groups.push(group);
    });
    return groups;
  }
  
  toggleSubMenu(group: { isOpen: boolean; link?: string; items?: any[] }) {
    if (group.items && group.items.length > 0) {
      // Toggle the clicked submenu
      group.isOpen = !group.isOpen;

      // Close sibling submenus at the same level, but do not affect ancestors
      this.groupedNavItems.forEach((parentGroup) => {
        if (parentGroup !== group) {
          // Only close sibling groups directly at the top level
          if (!this.isNestedGroup(parentGroup, group)) {
            parentGroup.isOpen = false;

            // Close nested items within sibling groups
            parentGroup.items?.forEach((item: any) => {
              if (item !== group && item.isOpen) {
                item.isOpen = false;
              }
            });
          }
        }
      });
    } else if (group.link) {
      // Navigate if the item has a link
      this.router.navigateByUrl(group.link).catch((error) => {
        console.error('Navigation error:', error);
      });
    }
  }

  // Helper function to check if a group is nested within another
  isNestedGroup(parentGroup: any, targetGroup: any): boolean {
    if (!parentGroup.items) return false;

    // Recursively check for the target group in nested items
    const checkNested = (items: any[]): boolean => {
      return items.some(
        (item) =>
          item === targetGroup || (item.items && checkNested(item.items))
      );
    };

    return checkNested(parentGroup.items);
  }
}
