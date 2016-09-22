import { Component, OnInit, Input } from '@angular/core';
import { CookiesHandler } from './cookies.service';
import { NewcontactComponent } from './newcontact/index';
import { ContactslistComponent } from './contactslist/index';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: [CookiesHandler],
  directives: [NewcontactComponent,ContactslistComponent]
})

export class HomeComponent implements OnInit {
  c : CookiesHandler;

  contacts : Object;
  activeContacts : Object;

    addNewContactAndRefresh(e){
      let names : string[] = Object.keys(e);

      for (let name of names) {
        this.c.saveContactToCookie(name, e[name]);
      }
      this.refreshList();
    }

    refreshList(){
      this.contacts = this.c.getAllContactsFromCookie();
      this.activeContacts = this.getInactiveContacts(this.contacts);
    }

    refreshListByWord(word){
      this.contacts = this.c.getAllContactsHaving(word);
    }

    deleteContactAndRefresh(contact){
      this.c.deleteContact(contact);
      this.contacts = this.c.getAllContactsFromCookie();
      this.activeContacts = this.getInactiveContacts(this.contacts);
    }

    getInactiveContacts(contacts){
      let toReturn : any = {};
      let names : string[] = Object.keys(contacts);

      for (let name of names) {
        toReturn[name] = 'inactive';
      }
      return toReturn;
    }

    editContactAndRefresh(e){
      let originalName : string = e['originalName'];
      let nameEdit : string = e['nameEdit'];
      let phoneEdit : string = e['phoneEdit'];

      this.c.deleteContact(originalName);
      this.c.saveContactToCookie(nameEdit, phoneEdit);
      this.refreshList();
    }


  constructor(cookiesHandler : CookiesHandler) {
    this.c = cookiesHandler;
    this.refreshList();
  }

  ngOnInit() {
  }

}
