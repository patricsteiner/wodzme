import { FieldValue, Timestamp } from '@angular/fire/firestore';
import { WodFocus, WodLevel, WodType } from './types';

export interface Wod {
  id?: string;
  title: string;
  description?: string;
  exercises: Exercise[];
  // ownerUserId?: string;
  createdAt?: Timestamp | FieldValue;
  updatedAt?: Timestamp | FieldValue;
  timeCap?: number;
  type?: WodType;
  level?: WodLevel;
  focuses?: WodFocus[];
}

export interface Exercise {
  movement: string;
  reps?: string;
  weight?: string;
}

export interface Score {
  id?: string;
  name: string;
  score: number;
  // userId?: string;
  createdAt?: Timestamp | FieldValue;
}
