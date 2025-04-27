import { Component } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { SettingsComponent } from "../settings/settings.component";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-upgrade-plan',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, SettingsComponent, NavbarComponent],
  templateUrl: './plan.component.html',
})
export class UpgradePlanComponent {
  currentPlan = 'Free';

  plans = [
    {
      name: 'Free',
      price: 0,
      description: 'Explore how AI can assist you in creating exam questions more efficiently and effectively.',
      features: [
        'One document at a time',
        'Basic question types (MCQs & True/False)',
        'Up to 5 quiz generations per day'
      ]
    },
    {
      name: 'Pro',
      price: 20,
      description: 'Level up productivity and creativity with expanded access.',
      features: [
        'Unlimited document uploads',
        'Export quizzes to PDF, Word, or LMS formats',
        'Batch generation & quiz editing tools'
      ]
    }
  ];
}
