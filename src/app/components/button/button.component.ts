import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../material/material.module';
import { MemoryService } from '../../services/memory.service';
import { PalindromeWord } from '../../services/memory.service';
import { PopupWindowComponent } from '../popup-window/popup-window.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly dialog = inject(MatDialog);
  wordWithoutSpaces: string = '';
  palindrome: string = '';
  outputText: string = '';
  palindromeAnswer: PalindromeWord = {
    toBeAnswer: '',
    wordWithoutSpaces: '',
    palindrome: '',
  };
  @Input() word: string = '';
  @Output() emitter = new EventEmitter<string>();
  constructor(private memoryService: MemoryService) {}

  palindromeFunction() {
    this.wordWithoutSpaces = '';
    this.palindrome = '';
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i] != ' ') {
        this.wordWithoutSpaces += this.word[i];
        this.palindrome = this.word[i] + this.palindrome;
      }
    }
    this.wordWithoutSpaces = this.wordWithoutSpaces.toLowerCase();
    this.palindrome = this.palindrome.toLowerCase();
    if (this.wordWithoutSpaces == this.palindrome) {
      this.outputText = 'IS';
      this.emitter.emit(`${this.word} -> Yes`);
    } else {
      this.outputText = 'IS NOT';
      this.emitter.emit(`${this.word} -> No`);
    }
    this.palindromeAnswer = {
      toBeAnswer: this.outputText,
      wordWithoutSpaces: this.wordWithoutSpaces,
      palindrome: this.palindrome,
    };
    this.memoryService.writeObject(this.palindromeAnswer);
    this.openDialog('300ms', '300ms');
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(PopupWindowComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
