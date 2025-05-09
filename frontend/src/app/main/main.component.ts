import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {NgClass, NgIf} from "@angular/common";
import { trigger, transition, style, animate } from '@angular/animations';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NavbarComponent,
    NgIf,
    FormsModule,
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

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }
  public submit: boolean = false;
  protected prompt: string = "";

  autoGrow(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set new height based on content
  }

  async Submit(){
    this.submit = true;
    //await this.fetchPdf();
  }

  triggerNewPrompt(){
    this.submit = false;
    this.prompt = ""
  }


  //PDF Result

  pdfUrl: SafeResourceUrl | null  = "assets/test.pdf";
  async fetchPdf() {
    const blob = new Blob([this.prompt], { type: 'text/plain' });
    const file = new File([blob], 'prompt.txt', { type: 'text/plain' });
    const formData = new FormData();
    formData.append('file', file);
    this.http.post('http://localhost:8000/extract-text', formData, { responseType: 'blob' })
      .subscribe({
        next: (pdfBlob) => {
          const url = URL.createObjectURL(pdfBlob);
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        },
        error: (err) => {
          console.error('PDF generation failed:', err);
        }
      });
  }

}

