import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { NgClass } from '@angular/common';

export type ChipOption<T> = {
  key: T;
  value: string;
  selected: boolean;
};

@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [NgClass],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsComponent {
  readonly options = model.required<ChipOption<any>[]>();
  readonly allowMultipleSelection = input<boolean>(false);

  toggleOption(option: string) {
    if (this.allowMultipleSelection()) {
      this.options.set(
        this.options().map((o) =>
          o.key === option ? { ...o, selected: !o.selected } : o,
        ),
      );
    } else {
      this.options.set(
        this.options().map((o) =>
          o.key === option
            ? { ...o, selected: !o.selected }
            : { ...o, selected: false },
        ),
      );
    }
  }
}
