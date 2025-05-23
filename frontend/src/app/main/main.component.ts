import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgClass, NgIf } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavbarComponent, NgIf, FormsModule],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('250ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}
  public submit: boolean = false;
  protected prompt: string = '';

  autoGrow(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  async Submit() {
    this.submit = true;
    await this.fetchPdf();
  }

  triggerNewPrompt() {
    this.submit = false;
    this.prompt = '';
  }
  selectedFile: File | null = null;
  previewText: string | null = null;
  pdfSrc: SafeResourceUrl | null = null;
  isTextFile = false;
  isPdfFile = false;
  isDocxFile = false;

  previewFile(file: File | null): void {
    if (file) {
      const fileName = file.name.toLowerCase();
      this.isTextFile = fileName.endsWith('.txt');
      this.isPdfFile = fileName.endsWith('.pdf');
      this.isDocxFile = fileName.endsWith('.docx');
      this.previewText = null;
      this.pdfSrc = null;

      if (this.isTextFile) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewText = e.target.result;
        };
        reader.readAsText(file);
      } else if (this.isPdfFile) {
        const reader = new FileReader();
        reader.onload = () => {
          this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
            reader.result as string
          );
        };
        reader.readAsDataURL(file); // base64 to embed in <iframe>
      }
    }
  }

  pdfFile: File | null = null;
  resultSrc: SafeResourceUrl | null = null;

  async fetchPdf() {
    if (!this.selectedFile) {
      const txtFile = new File(
        [this.prompt],
        "output.txt",
        { type: "text/plain" }
      );
      this.selectedFile = txtFile;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http
      .post('http://localhost:8000/extract-text', formData, {
        responseType: 'blob',
      })
      .subscribe(
        (blob) => {
          this.pdfFile = new File([blob], 'quiz.pdf', {
            type: 'application/pdf',
          });

          const reader = new FileReader();
          reader.onload = () => {
            this.resultSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
              reader.result as string
            );
          };
          reader.readAsDataURL(this.pdfFile);
        },
        (error) => {
          console.error('Upload error:', error);
        }
      );
  }

  Download() {
    if (this.pdfFile) {
      const url = window.URL.createObjectURL(this.pdfFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.pdfFile.name;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile);
    }
  }

  async uploadFile($event: Event) {
    this.onFileChange($event);
    await this.Submit();
    this.previewFile(this.selectedFile);
  }
}
