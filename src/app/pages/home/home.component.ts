import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChipsComponent } from '../../ui/chips/chips.component';
import { WodService } from '../../services/wod.service';
import { AsyncPipe } from '@angular/common';
import { WodViewComponent } from '../../ui/wod-view/wod-view.component';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [ChipsComponent, AsyncPipe, WodViewComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  wod$ = this.wodService.getNewest();
  // .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  // without shareReplay the application never becomes stable and cannot even build. i don't rly understand why, but when the scores below depend on this observable, it seems to be necessary.

  constructor(private readonly wodService: WodService) {}
}
