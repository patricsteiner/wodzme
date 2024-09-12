import { WodDuration, WodFocus, WodLevel, WodType } from './types';

export interface Wod {
  id: string;
  title: string;
  duration: WodDuration;
  timeCap?: number;
  type?: WodType;
  level?: WodLevel;
  focuses?: WodFocus[];
  exercises: Exercise[];
}

export interface Exercise {
  movement: string;
  reps?: string;
  weight?: string;
}
