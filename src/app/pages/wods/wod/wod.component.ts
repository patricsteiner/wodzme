import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WodService } from '../../../services/wod.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './wod.component.html',
  styleUrl: './wod.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WodComponent {
  readonly id = input.required<string>();
  readonly id$ = toObservable(this.id);

  readonly wod$ = this.id$.pipe(switchMap((id) => this.wodService.find(id)));

  readonly results$ = this.id$.pipe(switchMap((id) => this.wodService.getResults(id)));

  constructor(private readonly wodService: WodService) {}

  addResult(value: string) {
    this.wodService.addResult(this.id(), value);
  }
}
