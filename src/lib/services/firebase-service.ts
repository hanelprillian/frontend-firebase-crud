import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  QueryDocumentSnapshot,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";

export interface IFirestoreService<T> {
  add(data: Omit<T, "id">): Promise<string>;
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  update(id: string, data: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
}

export class FirestoreService<T extends { id?: string }>
  implements IFirestoreService<T>
{
  constructor(private collectionName: string) {}

  async add(data: Omit<T, "id">): Promise<string> {
    const docRef = await addDoc(collection(db, this.collectionName), data);
    return docRef.id;
  }

  async getAll(): Promise<T[]> {
    const querySnapshot = await getDocs(collection(db, this.collectionName));
    return querySnapshot.docs.map(
      (doc: QueryDocumentSnapshot) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as T)
    );
  }

  async getById(id: string): Promise<T | null> {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    } else {
      return null;
    }
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    const docRef = doc(db, this.collectionName, id) as DocumentReference<T>;
    await updateDoc(docRef, data as DocumentData);
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
  }
}
