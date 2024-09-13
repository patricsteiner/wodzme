import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WodService } from '../../services/wod.service';
import { Exercise, Wod } from '../../services/wod.model';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, ButtonComponent],
  templateUrl: './wod-editor.component.html',
  styleUrl: './wod-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WodEditorComponent {
  id = input<string>();

  wod$ = toObservable(this.id)
    .pipe(filter(Boolean))
    .pipe(switchMap((id) => this.wodService.find(id)));

  readonly wodForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.maxLength(400)]],
    timeCap: [0, [Validators.min(1), Validators.max(600)]],
    exercises: this.fb.nonNullable.array([this.createExerciseFormGroup(), this.createExerciseFormGroup(), this.createExerciseFormGroup()]),
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly wodService: WodService,
    private readonly router: Router,
  ) {
    this.wod$.subscribe((wod) => {
      this.wodForm.patchValue(wod);
      this.wodForm.controls.exercises.clear();
      wod.exercises.forEach(() => this.addExercise());
      wod.exercises.forEach((exercise, i) => this.wodForm.controls.exercises.at(i).patchValue(exercise));
    });
  }

  private createExerciseFormGroup(): FormGroup {
    return this.fb.group({
      movement: ['', [Validators.required, Validators.maxLength(50)]],
      reps: ['', [Validators.maxLength(20)]],
      weight: ['', [Validators.maxLength(20)]],
    });
  }

  addExercise() {
    this.wodForm.controls.exercises.push(this.createExerciseFormGroup());
  }

  removeExercise(i: number) {
    this.wodForm.controls.exercises.removeAt(i);
  }

  moveExerciseUp(i: number) {
    if (i === 0) return;
    const exercises = this.wodForm.controls.exercises;
    const exercise = exercises.at(i);
    exercises.removeAt(i);
    exercises.insert(i - 1, exercise);
  }

  moveExerciseDown(i: number) {
    const exercises = this.wodForm.controls.exercises;
    if (i === exercises.length - 1) return;
    const exercise = exercises.at(i);
    exercises.removeAt(i);
    exercises.insert(i + 1, exercise);
  }

  async save() {
    this.wodForm.markAllAsTouched();
    if (!this.wodForm.valid) return;
    const wod: Wod = {
      ...this.wodForm.getRawValue(),
      exercises: this.wodForm.controls.exercises.getRawValue() as Exercise[],
    };
    let id = this.id();
    if (id) {
      await this.wodService.update(this.id()!, wod);
    } else {
      id = await this.wodService.create(wod);
    }
    await this.router.navigate(['/wods/', id]);
  }

  async delete() {
    if (this.id()) await this.wodService.delete(this.id()!);
    await this.router.navigate(['/wods']);
  }
}
