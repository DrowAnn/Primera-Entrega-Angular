import { Component, inject, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MemoryService } from '../../services/memory.service';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-popup-window',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './popup-window.component.html',
  styleUrl: './popup-window.component.scss',
})
export class PopupWindowComponent implements OnDestroy {
  readonly dialogRef = inject(MatDialogRef<PopupWindowComponent>);
  constructor(private memoryService: MemoryService) {}

  palindromeAnswer = this.memoryService.readObject();

  ngOnDestroy(): void {}
}
