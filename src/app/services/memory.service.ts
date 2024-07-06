import { Injectable } from '@angular/core';

export interface PalindromeWord {
  toBeAnswer: string;
  wordWithoutSpaces: string;
  palindrome: string;
}

@Injectable({
  providedIn: 'root',
})
export class MemoryService {
  private palindromeAnswer: PalindromeWord = {
    toBeAnswer: '',
    wordWithoutSpaces: '',
    palindrome: '',
  };

  constructor() {}

  writeObject(inputPalindromeWord: PalindromeWord) {
    this.palindromeAnswer = inputPalindromeWord;
  }

  readObject() {
    return this.palindromeAnswer;
  }
}
