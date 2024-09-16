import { FieldValue, Timestamp } from '@angular/fire/firestore';

export interface Wod {
  id?: string;
  name: string;
  description?: string;
  parts: WodPart[];
  // ownerUserId?: string;
  createdAt?: Timestamp | FieldValue;
  updatedAt?: Timestamp | FieldValue;
}

export interface WodPart {
  description: string;
  exercises: Exercise[];
}

export interface Exercise {
  movement: string;
  reps?: string;
  weight?: string;
}

export interface Score {
  id?: string;
  name: string;
  score: string;
  // userId?: string;
  createdAt?: Timestamp | FieldValue;
}
