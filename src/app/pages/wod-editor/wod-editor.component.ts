import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WodService } from '../../services/wod.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { DatePipe, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../ui/button/button.component';
import { Wod } from '../../services/wod.model';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, ButtonComponent, DatePipe],
  templateUrl: './wod-editor.component.html',
  styleUrl: './wod-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WodEditorComponent {
  id = input<string>();
  draggingExerciseIdx: number | null = null;
  draggingPartIdx: number | null = null;

  readonly defaultName = 'WOD ' + new DatePipe('de-CH').transform(new Date(), 'dd.MM.yyyy');

  wod$ = toObservable(this.id)
    .pipe(filter(Boolean))
    .pipe(switchMap((id) => this.wodService.find(id)));

  readonly wodForm = this.fb.nonNullable.group({
    name: [this.defaultName, [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.maxLength(50)]],
    parts: this.fb.nonNullable.array([this.createWodPartFormGroup()]),
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly wodService: WodService,
    private readonly router: Router,
  ) {
    this.wod$.subscribe((wod) => {
      this.wodForm.patchValue(wod);
      this.wodForm.controls.parts.clear();
      wod.parts.forEach((part, i) => {
        this.addPart();
        this.wodForm.controls.parts.at(i).patchValue(part);
        this.wodForm.controls.parts.at(i).controls.exercises.clear();
        part.exercises.forEach(() => this.addExercise(i));
        part.exercises.forEach((exercise, j) => this.wodForm.controls.parts.at(i).controls.exercises.at(j).patchValue(exercise));
      });
    });
  }

  private createWodPartFormGroup() {
    return this.fb.nonNullable.group({
      description: ['', [Validators.required, Validators.maxLength(50)]],
      exercises: this.fb.nonNullable.array([this.createExerciseFormGroup()]),
    });
  }

  private createExerciseFormGroup() {
    return this.fb.nonNullable.group({
      movement: ['', [Validators.required, Validators.maxLength(50)]],
      reps: ['', [Validators.maxLength(20)]],
      weight: ['', [Validators.maxLength(20)]],
    });
  }

  addExercise(partIdx: number) {
    this.wodForm.controls.parts.at(partIdx).controls.exercises.push(this.createExerciseFormGroup());
  }

  removeExercise(partIdx: number, exerciseIdx: number) {
    this.wodForm.controls.parts.at(partIdx).controls.exercises.removeAt(exerciseIdx);
  }

  async save() {
    this.wodForm.markAllAsTouched();
    if (!this.wodForm.valid) return;
    const wod: Wod = this.wodForm.getRawValue();
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

  addPart() {
    this.wodForm.controls.parts.push(this.createWodPartFormGroup());
  }

  removePart(partIdx: number) {
    this.wodForm.controls.parts.removeAt(partIdx);
  }

  moveDraggingExerciseTo(partIdx: number, exerciseIdx: number) {
    if (this.draggingExerciseIdx === null || this.draggingPartIdx !== partIdx) return;
    const exercises = this.wodForm.controls.parts.at(partIdx).controls.exercises;
    const exercise = exercises.at(this.draggingExerciseIdx);
    exercises.removeAt(this.draggingExerciseIdx);
    exercises.insert(exerciseIdx, exercise);
    this.draggingExerciseIdx = null;
  }
}
