import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
isDropdownOpen = false;
  isSubmenuOpen: string | null = null;

  toggleDropdown(event: Event): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    event.preventDefault();
  }

  toggleSubmenu(event: Event, submenu: string): void {
    this.isSubmenuOpen = this.isSubmenuOpen === submenu ? null : submenu;
    event.preventDefault();
    event.stopPropagation();
  }

  areNotificationsOpen = false;
  isAvatarDropdownOpen = false;

  toggleNotifications(): void {
    this.areNotificationsOpen = !this.areNotificationsOpen;
  }

  toggleAvatarDropdown(): void {
    this.isAvatarDropdownOpen = !this.isAvatarDropdownOpen;
  }
}
