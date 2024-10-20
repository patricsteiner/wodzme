export enum WodDuration {
  SHORT = 'SHORT',
  MEDIUM = 'MEDIUM',
  LONG = 'LONG',
}

export enum WodLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  RX = 'RX',
  BRUTAL = 'BRUTAL',
}

export enum WodFocus {
  METCON = 'METCON',
  WEIGHTLIFTING = 'WEIGHTLIFTING',
  GYMNASTICS = 'GYMNASTICS',
}

export enum WodType {
  RFT = 'RFT',
  AMRAP = 'AMRAP',
  EMOM = 'EMOM',
  CHIPPER = 'CHIPPER',
  MIXED = 'MIXED',
}

export interface Exercise {
  movement: Movement;
  reps?: string;
  weight?: string;
}

export type MovementId = string;

export interface Movement {
  id: MovementId;
  name: string;
  shortName: string;
  difficulty: MovementDifficulty;
  equipment?: string;
  primaryMuscleGroup: MuscleGroup;
  secondaryMuscleGroup?: MuscleGroup;
  type: MovementType;
  referenceReps?: string; // approximate amount of reps for this movement to be used as an exercise in a WOD (e.g. for DUs it might be 50, for snatches it might be 5, for burpees it might be 10, etc.)
  referenceWeight?: string; // approximate weight for this movement to be used as an exercise in a WOD (e.g. for snatches it might be 50/35 kg, for KBS it might be 24/16 kg, etc.)
}

export enum MovementDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  ELITE = 'ELITE',
}

export enum MovementType {
  GYMNASTICS = 'GYMNASTICS',
  WEIGHTLIFTING = 'WEIGHTLIFTING',
  CARDIO = 'CARDIO',
  POWERLIFTING = 'POWERLIFTING',
  STRONGMAN = 'STRONGMAN',
}

export enum MuscleGroup {
  FOREARMS = 'FOREARMS',
  BICEPS = 'BICEPS',
  TRICEPS = 'TRICEPS',
  SHOULDERS = 'SHOULDERS',
  TRAPS = 'TRAPS',
  CHEST = 'CHEST',
  LAT = 'LAT',
  ABS = 'ABS',
  UPPER_BACK = 'UPPER_BACK',
  LOWER_BACK = 'LOWER_BACK',
  GLUTES = 'GLUTES',
  HAMSTRINGS = 'HAMSTRINGS',
  QUADRICEPS = 'QUADRICEPS',
  CALVES = 'CALVES',
}
