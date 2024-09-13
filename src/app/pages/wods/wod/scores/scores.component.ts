import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WodService } from '../../../../services/wod.service';
import { AsyncPipe } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { ButtonComponent } from '../../../../ui/button/button.component';

@Component({
  standalone: true,
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, ButtonComponent],
})
export class ScoresComponent {
  readonly id = input.required<string>();

  protected readonly scores$ = toObservable(this.id).pipe(
    filter(Boolean),
    switchMap((id) => this.wodService.getScores(id)),
  );

  constructor(private readonly wodService: WodService) {}

  deleteScore(id: string) {
    this.wodService.deleteScore(this.id(), id);
  }
}
