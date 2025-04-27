import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {SettingsComponent} from "../settings/settings.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    SettingsComponent,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @ViewChild("btn") private btn: ElementRef | undefined;

  protected menuBool = false;
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.btn) {
      let el = this.btn.nativeElement;
      if (!el.contains(event.target)) {
        this.menuBool = false; // Hide menu on outside click
      }
    }
  }

  toggleDropdown() {
    this.menuBool = !this.menuBool;
  }
}
