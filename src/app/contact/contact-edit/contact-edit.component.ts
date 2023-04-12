import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CompanyService } from 'src/app/company/company.service';
import { Company } from 'src/app/models/company';
import { Contact } from '../../models/contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  contact$: Observable<Contact | undefined> | undefined;
  companies$: Observable<Company[] | undefined> | undefined; // step 3


  constructor(
    private contactService: ContactService,
    private companyService: CompanyService, 
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      if (!this.isNew) {
        this.contact$ = contactService.getContactObservable(this.id);
      } else {
        this.contact$ = of({}) as Observable<Contact>;
      }

      this.companies$ = companyService.getCompaniesObservable(); // step 3
    }

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
    this.contactService.editContact(contact) // step 4
      .then(_ => this.router.navigate(['/contact/all']));
  }


  deleteContact() {
    this.contactService.deleteContact(this.id)
      ?.then(_ => this.router.navigate(['/contact/all']));
  }


}
