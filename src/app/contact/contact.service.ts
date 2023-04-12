import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { catchError, map, Observable, throwError } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, CollectionReference, DocumentChangeAction} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactRef: AngularFirestoreDocument<Contact>;
  private contactsRef: AngularFirestoreCollection<Contact>;


  constructor(private db: AngularFirestore) {
    this.contactRef = this.db.doc<Contact>('contacts/zW4ivi07pOfxFnfPlInk');
    this.contactsRef = this.db.collection<Contact>('contacts');
  }

  getContactsObservable(companyId: string): Observable<Contact[]> {
    const filteredContacts = companyId != null ?
      this.db.collection<Contact>('contacts', (ref: CollectionReference) => ref.where('companyId', '==', companyId))
      : this.contactsRef;

    return filteredContacts.snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<Contact>[]): Contact[] => {
          return items.map((item: DocumentChangeAction<Contact>): Contact => {
            return {
              id: item.payload.doc.id,
              companyId: item.payload.doc.data().companyId,
              name: item.payload.doc.data().name,
              phone: item.payload.doc.data().phone
            };
          });
        }),
        catchError(this.errorHandler)
      );
  }


  getContactObservable(id: string | null): Observable<Contact | undefined> {
    return this.db.doc<Contact>(`contacts/${id}`)
    .valueChanges()
    .pipe(                          // <-- new
    catchError(this.errorHandler) // <-- new
  );                              // <-- new;
  }

  saveContact(contact: Contact) {
    this.contactsRef.add(contact)
      .then(_ => console.log('success on add'))
      .catch(error => console.log('add', error));
  }

  editContact(contact: Contact) {
    return this.contactsRef.doc(contact.id).update(contact)
      .then(_ => console.log('Success on update'))
      .catch(error => console.log('update', error));
  }

  deleteContact(id: string | null) {
    return this.contactsRef.doc(id).delete()
      .then(_ => console.log('Success on delete'))
      .catch(error => console.log('delete', error));
  }

  private errorHandler(error: unknown) {
    console.log(error);
    return throwError(error);
  }

}


