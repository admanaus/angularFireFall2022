import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact';
import { CompanyService } from 'src/app/company/company.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  public contacts$: Observable<Contact[]> | undefined;
  public companies$: Observable<Contact[]> | undefined;

  constructor(
    private contactService: ContactService,
    private companyService: CompanyService
    ) {
  }

  ngOnInit() {
    this.getContacts();
    this.getCompanies();
  }

  getContacts(companyId: string | null = null) {
    this.contacts$ = this.contactService.getContactsObservable(companyId);
  }

  getCompanies() {
    this.companies$ = this.companyService.getCompaniesObservable();
  }
}