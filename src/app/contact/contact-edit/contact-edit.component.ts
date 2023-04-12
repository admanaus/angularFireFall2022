import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Contact } from '../../models/contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  contact$: Observable<Contact | undefined> | undefined;

  constructor(private contactService: ContactService, 
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      if (!this.isNew) {
        this.contact$ = contactService.getContactObservable(this.id);
      } else {
        this.contact$ = of({}) as Observable<Contact>;
      }  }

  ngOnInit() {}

  get id(): string | null {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  get isNew(): boolean {
    return this.id === 'new';
  }

  saveContact(contact: Contact) {
    this.contactService.saveContact(contact);
  }

  editContact(contact: Contact) {
    this.contactService.editContact(contact);
  }

  deleteContact() {
    this.contactService.deleteContact(this.id)
      ?.then(_ => this.router.navigate(['/contact/all']));
  }


}
