import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WodService } from '../../../services/wod.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../ui/button/button.component';
import { WodViewComponent } from '../../../ui/wod-view/wod-view.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Score } from '../../../services/wod.model';

@Component({
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterLink, ButtonComponent, WodViewComponent, ReactiveFormsModule],
  templateUrl: './wod.component.html',
  styleUrl: './wod.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WodComponent {
  readonly id = input.required<string>();
  readonly id$ = toObservable(this.id);
  readonly wod$ = this.id$.pipe(switchMap((id) => this.wodService.find(id)));

  readonly scoreForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    score: [0, Validators.required],
  });

  constructor(
    private readonly wodService: WodService,
    private readonly fb: FormBuilder,
  ) {}

  addScore() {
    const score: Score = this.scoreForm.getRawValue();
    this.wodService.addScore(this.id(), score);
  }
}
