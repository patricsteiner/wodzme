import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WodService } from '../../services/wod.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterOutlet],
  templateUrl: './wods.component.html',
  styleUrl: './wods.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WodsComponent {
  readonly wods$ = inject(WodService).findAll();
}
