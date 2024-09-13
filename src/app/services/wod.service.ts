import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Score, Wod } from './wod.model';

@Injectable({
  providedIn: 'root',
})
export class WodService {
  private readonly wodsCollectionName = 'wods';
  private readonly scoresCollectionName = 'scores';

  constructor(private readonly firestore: Firestore) {}

  findAll(): Observable<Wod[]> {
    return collectionData(query(collection(this.firestore, this.wodsCollectionName), orderBy('createdAt', 'asc')), { idField: 'id' });
  }

  find(id: string): Observable<Wod> {
    return docData(doc(this.firestore, this.wodsCollectionName, id), { idField: 'id' });
  }

  async create(wod: Wod) {
    wod.createdAt = serverTimestamp();
    return addDoc(collection(this.firestore, this.wodsCollectionName), wod).then((docRef) => docRef.id);
  }

  async update(id: string, wod: Wod) {
    wod.updatedAt = serverTimestamp();
    delete wod.id;
    return setDoc(doc(this.firestore, this.wodsCollectionName, id), wod, { merge: true });
  }

  async delete(id: string) {
    return deleteDoc(doc(this.firestore, this.wodsCollectionName, id));
  }

  getScores(id: string): Observable<Score[]> {
    return collectionData(query(collection(this.firestore, this.wodsCollectionName, id, this.scoresCollectionName)), { idField: 'id' });
  }

  async addScore(id: string, score: Score) {
    score.createdAt = serverTimestamp();
    return addDoc(collection(this.firestore, this.wodsCollectionName, id, this.scoresCollectionName), score).then((docRef) => docRef.id);
  }

  deleteScore(id: string, scoreId: string) {
    return deleteDoc(doc(this.firestore, this.wodsCollectionName, id, this.scoresCollectionName, scoreId));
  }

  newest(): Observable<Wod> {
    return collectionData(query(collection(this.firestore, this.wodsCollectionName), orderBy('createdAt', 'asc'), limit(1)), {
      idField: 'id',
    }).pipe(map((wods: Wod[]) => wods[0]));
  }
}
