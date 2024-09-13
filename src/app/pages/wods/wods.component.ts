import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WodService } from '../../services/wod.service';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterOutlet, SlicePipe, ButtonComponent],
  templateUrl: './wods.component.html',
  styleUrl: './wods.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WodsComponent {
  readonly wods$ = inject(WodService).findAll();
}
