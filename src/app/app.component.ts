import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChipsComponent } from './ui/chips/chips.component';
import { AsyncPipe } from '@angular/common';
import { BottomNavComponent } from './layout/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChipsComponent, AsyncPipe, BottomNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
