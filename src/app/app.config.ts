import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getVertexAI, provideVertexAI } from '@angular/fire/vertexai-preview';
import { registerLocaleData } from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';

const firebaseOptions = {
  projectId: 'wodzme',
  appId: '1:497002003415:web:738026de8196ab42e46992',
  storageBucket: 'wodzme.appspot.com',
  apiKey: 'AIzaSyDF77iFBbdcCxq1J3-b9LjvIjXO4NKh6OM',
  authDomain: 'wodzme.firebaseapp.com',
  messagingSenderId: '497002003415',
};

registerLocaleData(localeDECH);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(firebaseOptions)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideVertexAI(() => getVertexAI()),
    { provide: LOCALE_ID, useValue: 'de-CH' },
  ],
};
