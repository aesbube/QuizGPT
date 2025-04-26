import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {NgClass, NgIf} from "@angular/common";
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NavbarComponent,
    NgIf,
  ],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('250ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  protected submit: boolean = false;

  autoGrow(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set new height based on content
  }

  Submit(){
    this.submit = true;
  }
}

