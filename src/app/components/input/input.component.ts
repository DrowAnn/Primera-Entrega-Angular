import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [MaterialModule, ButtonComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  value = 'Try me!';
  palindromeArray: string[] = [];

  onEmit(word: string) {
    this.palindromeArray.push(word);
  }
}
