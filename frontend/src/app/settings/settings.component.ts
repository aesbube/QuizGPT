import { Component, Input, input } from '@angular/core';
import { NgIf } from '@angular/common';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NgIf, RouterLink, RouterLinkActive],
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

  //TO-DO
  signOut(){

  }
}
