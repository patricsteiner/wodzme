import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChipsComponent } from '../../ui/chips/chips.component';
import { WodService } from '../../services/wod.service';
import { AsyncPipe } from '@angular/common';
import { switchMap } from 'rxjs';
import { WodViewComponent } from '../../ui/wod-view/wod-view.component';

@Component({
  standalone: true,
  imports: [ChipsComponent, AsyncPipe, WodViewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  wod$ = this.wodService.newest();
  scores$ = this.wod$.pipe(switchMap((wod) => this.wodService.getScores(wod.id!)));

  constructor(private readonly wodService: WodService) {}
}
