import {Component, ElementRef, HostListener, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {SettingsComponent} from "../settings/settings.component";
import {NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    SettingsComponent,
    NgIf,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
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

  @Output() promptEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  newPrompt(){
    this.promptEmit.emit(false);
  }

  protected userInitials : string = ''
  // TO-DO da se zameni email so get na email od userot
  loadInitials(){
    // MOCKUP MAIL
    let email = "luka.krstikj@example.com";
    email = email.split("@")[0];
    if(email.split(".").length == 2){
      this.userInitials = email.split(".")[0][0] + email.split(".")[1][0];
    }
    else {
      this.userInitials = email[0] + email[1];
    }
    this.userInitials = this.userInitials.toUpperCase();
  }
  ngOnInit() {
    this.loadInitials()
  }
}
