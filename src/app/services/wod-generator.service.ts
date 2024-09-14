import { WodDuration, WodFocus, WodLevel, WodType } from './types';
import { Injectable } from '@angular/core';
import { getGenerativeModel, VertexAI } from '@angular/fire/vertexai-preview';

type WodConfig = {
  duration?: WodDuration;
  level?: WodLevel;
  wodType?: WodType;
  focus?: WodFocus[];
};

const durations = {
  [WodDuration.SHORT]: 'under 10 minutes',
  [WodDuration.MEDIUM]: '10-20 minutes',
  [WodDuration.LONG]: 'more than 20 minutes',
};
const levels = {
  [WodLevel.BEGINNER]: 'For beginner crossfit athletes',
  [WodLevel.INTERMEDIATE]: 'For intermediate crossfit athletes',
  [WodLevel.RX]: 'Tough workout for experienced crossfit athletes',
  [WodLevel.BRUTAL]: 'Absolutely fucking insane and brutal workout, only for the fittest of the fit',
};
const types = {
  [WodType.RFT]: 'Rounds for time',
  [WodType.AMRAP]: 'As many rounds as possible',
  [WodType.EMOM]: 'Every minute on the minute',
  [WodType.CHIPPER]: 'As fast as possible',
  [WodType.MIXED]: 'A mix between all possible crossfit workout styles (RFT, AMRAP, EMOM, CHIPPERS, ...)',
};
const focuses = {
  [WodFocus.METCON]: 'Metabolic conditioning',
  [WodFocus.WEIGHTLIFTING]: 'Weightlifting',
  [WodFocus.GYMNASTICS]: 'Gymnastics and bodyweight exercises',
};

@Injectable({
  providedIn: 'root',
})
export class WodGeneratorService {
  constructor(private readonly vertexAI: VertexAI) {}

  async generateWod(wodConfig: WodConfig): Promise<string> {
    const model = getGenerativeModel(this.vertexAI, {
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' },
      systemInstruction: {
        role: 'system',
        parts: [
          {
            text: 'Your task is to create a crossfit workout, taking into account the given requirements',
          },
          {
            text: 'if you receive "Workout properties", please take them into account. Otherwise, you are free to come up with any workout.',
          },
          {
            text: 'The output should be a complete workout in the following json format: { "title": string, "description": string, "timeCap": number, "exercises": [ { "movement": string, "reps": string, "weight": string } ] }',
          },
          {
            text: 'the description should only contain the workout type. Some examples: "N RFT" (replace N with a number), "AMRAP", "EMOM", "21-15-9", or ladders/pyramids.',
          },
          {
            text: 'if some values are not necessary (e.g. timeCap, weight, reps), set them as an empty string or 0.',
          },
        ],
      },
    });
    return model
      .generateContent('Workout requirements: ' + this.stringifyWodConfig(wodConfig))
      .catch((error) => {
        console.error(error);
        return {
          response: {
            text: () => 'Error - Too many requests. Please wait a few minutes and try again.',
          },
        };
      })
      .then((res) => res.response.text());
  }

  private stringifyWodConfig(wodConfig: WodConfig) {
    let res = '';
    if (wodConfig.duration) {
      res += 'duration: ' + wodConfig.duration + ' (' + durations[wodConfig.duration] + ')\n';
    }
    if (wodConfig.level) {
      res += 'level: ' + wodConfig.level + ' (' + levels[wodConfig.level] + ')\n';
    }
    if (wodConfig.wodType) {
      res += 'type: ' + wodConfig.wodType + ' (' + types[wodConfig.wodType] + ')\n';
    }
    if (wodConfig.focus?.length) {
      res += 'focus: ' + wodConfig.focus.map((f) => focuses[f]).join(', ') + '\n';
    }
    if (!res) {
      res = 'no specific requirements.';
    }
    return res;
  }
}
