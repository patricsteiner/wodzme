import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'button[app-button], a[app-button]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {}
