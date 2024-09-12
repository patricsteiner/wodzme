import { Injectable } from '@angular/core';
import { getGenerativeModel, VertexAI } from '@angular/fire/vertexai-preview';
import { WodDuration, WodFocus, WodLevel, WodType } from './types';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  query,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
  [WodLevel.BRUTAL]:
    'Absolutely brutal workout, only for the fittest of the fit',
};
const types = {
  [WodType.RFT]: 'Rounds for time',
  [WodType.AMRAP]: 'As many rounds as possible',
  [WodType.EMOM]: 'Every minute on the minute',
  [WodType.CHIPPER]: 'As fast as possible',
  [WodType.MIXED]:
    'A mix between all possible crossfit workout styles (RFT, AMRAP, EMOM, CHIPPERS, ...)',
};
const focuses = {
  [WodFocus.METCON]: 'Metabolic conditioning',
  [WodFocus.WEIGHTLIFTING]: 'Weightlifting',
  [WodFocus.GYMNASTICS]: 'Gymnastics and bodyweight exercises',
};

@Injectable({
  providedIn: 'root',
})
export class WodService {
  constructor(
    private readonly firestore: Firestore,
    private readonly vertexAI: VertexAI,
  ) {}

  async generateWod(wodConfig: WodConfig): Promise<string> {
    const model = getGenerativeModel(this.vertexAI, {
      model: 'gemini-1.5-flash',
      systemInstruction: {
        role: 'system',
        parts: [
          {
            text: 'Your task is to create a crossfit WOD (workout of the day).',
          },
          {
            text: 'Be brief, do not include any explanations and no warmup and cooldown.',
          },
          {
            text: 'Use the metric system, and if the exercises have different weights for mena and woman, please note it with a slash (e.g. 100kg/80kg).',
          },
          {
            text: 'Provide the workout in plain text, do not use markdown. The only formating you are allowed to use is dashes for lists of exercises. Make sure you do not include any dashes in front of the titles (only use them for list items).',
          },
          {
            text: 'If additional workout properties are given, please take them into account. Otherwise, you are free to come up with any workout you like.',
          },
        ],
      },
    });
    return model
      .generateContent(
        'Workout properties: ' + this.stringifyWodConfig(wodConfig),
      )
      .catch((error) => {
        console.error(error);
        return {
          response: {
            text: () =>
              'Error - Too many requests. Please wait a few minutes and try again.',
          },
        };
      })
      .then((res) => res.response.text());
  }

  private stringifyWodConfig(wodConfig: WodConfig) {
    let res = '';
    if (wodConfig.duration) {
      res +=
        'duration: ' +
        wodConfig.duration +
        ' (' +
        durations[wodConfig.duration] +
        ')\n';
    }
    if (wodConfig.level) {
      res +=
        'level: ' + wodConfig.level + ' (' + levels[wodConfig.level] + ')\n';
    }
    if (wodConfig.wodType) {
      res +=
        'type: ' + wodConfig.wodType + ' (' + types[wodConfig.wodType] + ')\n';
    }
    if (wodConfig.focus?.length) {
      res +=
        'focus: ' + wodConfig.focus.map((f) => focuses[f]).join(', ') + '\n';
    }
    return res;
  }

  findAll(): Observable<{ workout: string }[]> {
    return collectionData(query(collection(this.firestore, 'workouts')));
  }

  find(id: string) {
    return docData(doc(this.firestore, 'workouts', id));
  }

  save(workout: string) {
    addDoc(collection(this.firestore, 'workouts'), { workout });
  }

  addResult(id: string, result: string) {
    addDoc(collection(this.firestore, 'workouts', id, 'results'), { result });
  }
}
