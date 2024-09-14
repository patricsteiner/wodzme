import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Wod } from '../../services/wod.model';

@Component({
  selector: 'wdz-wod-view',
  standalone: true,
  templateUrl: './wod-view.component.html',
  styleUrl: './wod-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WodViewComponent {
  readonly wod = input.required<Wod>();
}
