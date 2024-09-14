import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'button[wdz-button], a[wdz-button]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {}
