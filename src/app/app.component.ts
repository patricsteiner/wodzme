import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { getGenerativeModel, VertexAI } from '@angular/fire/vertexai-preview';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly wod = signal(`20 rounds for time:
- 5 pull-ups
- 10 push-ups
- 15 air squats
- 10 sit-ups
- 5 burpees`);

  readonly loading = signal(false);

  constructor(private readonly vertexAI: VertexAI) {}

  async generateWod() {
    this.loading.set(true);
    const prompt =
      'Give me a crossfit workout of the day. A very tough and long one. Keep it simple, no unneeded titles, just the instructions (e.g. RFT, EMOM, AMRAP, whatever) and then bullet points (with dashes). Metric system. no warmup or cooldown, just the wod. dont use asterisks or other symbols, just dashes.';
    const model = getGenerativeModel(this.vertexAI, {
      model: 'gemini-1.5-flash',
    });
    const result = await model.generateContent(prompt).catch((error) => {
      console.error(error);
      return {
        response: {
          text: () =>
            'Error - Too many requests. Please wait a few minutes and try again.',
        },
      };
    });

    const response = result.response;
    this.wod.set(response.text());
    this.loading.set(false);
  }
}
