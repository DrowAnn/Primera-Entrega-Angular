import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  inject,
  Input,
  Output,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MaterialModule } from '../../material/material.module';

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
  @Input() word: string = '';
  @Output() emitter = new EventEmitter<string>();

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
    this.openDialog('300ms', '300ms');
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        toBeAnswer: this.outputText,
        word: this.wordWithoutSpaces,
        palindrome: this.palindrome,
      },
    });
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog.button.html',
  standalone: true,
  imports: [MaterialModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationsExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { toBeAnswer: string; word: string; palindrome: string }
  ) {}
}
