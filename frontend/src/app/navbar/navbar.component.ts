import { Component } from '@angular/core';
import {SettingsComponent} from "../settings/settings.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    SettingsComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
