import { Component, Input, input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NgIf],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  onSettings() {
    console.log('Settings clicked');
    this.closeDropdown();
  }

  onUpgrade() {
    console.log('Upgrade Plan clicked');
    this.closeDropdown();
  }

  onLogout() {
    console.log('Logout clicked');
    this.closeDropdown();
  }
}
