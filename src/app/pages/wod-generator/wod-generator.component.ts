import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ChipOption, ChipsComponent } from '../../ui/chips/chips.component';
import { WodDuration, WodFocus, WodLevel, WodType } from '../../services/types';
import { WodGeneratorService } from '../../services/wod-generator.service';

@Component({
  standalone: true,
  imports: [ChipsComponent],
  templateUrl: './wod-generator.component.html',
  styleUrl: './wod-generator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WodGeneratorComponent {
  readonly wod = signal(`20 rounds for time:
- 5 pull-ups
- 10 push-ups
- 15 air squats
- 10 sit-ups
- 5 burpees`);

  readonly loading = signal(false);

  durationOptions = signal<ChipOption<WodDuration>[]>([
    { key: WodDuration.SHORT, value: 'Short', selected: false },
    { key: WodDuration.MEDIUM, value: 'Medium', selected: false },
    { key: WodDuration.LONG, value: 'Long', selected: false },
  ]);
  levelOptions = signal<ChipOption<WodLevel>[]>([
    { key: WodLevel.BEGINNER, value: 'Beginner', selected: false },
    { key: WodLevel.INTERMEDIATE, value: 'Intermediate', selected: false },
    { key: WodLevel.RX, value: 'Rx', selected: false },
    { key: WodLevel.BRUTAL, value: 'Brutal', selected: false },
  ]);
  typeOptions = signal<ChipOption<WodType>[]>([
    { key: WodType.RFT, value: 'RFT', selected: false },
    { key: WodType.AMRAP, value: 'AMRAP', selected: false },
    { key: WodType.EMOM, value: 'EMOM', selected: false },
    { key: WodType.CHIPPER, value: 'Chipper', selected: false },
    { key: WodType.MIXED, value: 'Mixed', selected: false },
  ]);
  focusOptions = signal<ChipOption<WodFocus>[]>([
    { key: WodFocus.METCON, value: 'Metcon', selected: false },
    { key: WodFocus.WEIGHTLIFTING, value: 'Weightlifting', selected: false },
    { key: WodFocus.GYMNASTICS, value: 'Gymnastics', selected: false },
  ]);

  constructor(protected readonly wodGeneratorService: WodGeneratorService) {}

  async generateWod() {
    this.loading.set(true);
    const wodConfiguration = {
      duration: this.durationOptions()
        .filter((o) => o.selected)
        .map((o) => o.key)[0],
      level: this.levelOptions()
        .filter((o) => o.selected)
        .map((o) => o.key)[0],
      wodType: this.typeOptions()
        .filter((o) => o.selected)
        .map((o) => o.key)[0],
      focus: this.focusOptions()
        .filter((o) => o.selected)
        .map((o) => o.key),
    };
    await this.wodGeneratorService.generateWod(wodConfiguration).then((wod) => this.wod.set(wod));
    this.loading.set(false);
  }
}
