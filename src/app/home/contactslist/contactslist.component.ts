import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CookiesHandler } from '../cookies.service';
import { HomeComponent } from '../index';

@Component({
  moduleId: module.id,
  selector: 'app-contactslist',
  templateUrl: 'contactslist.component.html',
  styleUrls: ['contactslist.component.css']
})

export class ContactslistComponent implements OnInit {
  @Input() contacts : Object;
  @Input() activeContacts : Object;
  @Output() onTyping = new EventEmitter();
  @Output() onDeletingContact = new EventEmitter();
  @Output() onEditingContact = new EventEmitter();

  nameInput : string = 'Search';
  c : CookiesHandler;
  theTrigger : Object;

  nameEdit : string;
  phoneEdit : string;

  readonly : string = 'not-readonly';
  inputClass : string = 'empthy';

  focusFunction(){
    if(this.inputClass == 'empthy'){
      this.nameInput = '';
      this.inputClass = 'clicked';
    }
  }

  blurFunction(){
    if(this.nameInput == ''){
      this.nameInput = 'Search';
      this.inputClass = 'empthy';
    }
  }

  constructor(cookiesHandler : CookiesHandler) {
    this.c = cookiesHandler;
  }

  fireTypingEvent(word){
    if(this.inputClass == 'clicked'){
      this.onTyping.emit(word);
    }
  }

  fireDeleteContact(contact){
    this.onDeletingContact.emit(contact);
  }

  editContact(contact){
  //if(theUserWantsToExitEditMode)
    if(this.activeContacts[contact] == 'active'){
      this.activeContacts[contact] = 'inactive';
      this.readonly = 'not-readonly';
    }
    else{
      this.changeValuesOfMap(this.activeContacts, 'inactive');
      this.activeContacts[contact] = 'active';
      this.readonly = 'readonly';

      this.nameEdit = contact;
      this.phoneEdit = this.contacts[contact];
    }
  }

  changeValuesOfMap(theMap, value){
    let keys : string[] = Object.keys(theMap);

    for (let key of keys) {
      theMap[key] = value;
    }
  }

  fireEditContact(originalName){
    let theEvent : any = {};
    theEvent['originalName'] = originalName;
    theEvent['nameEdit'] = this.nameEdit;
    theEvent['phoneEdit'] = this.phoneEdit;

    this.onEditingContact.emit(theEvent);
  }

  searchClicked(){
    this.changeValuesOfMap(this.activeContacts, 'inactive');
  }


  orderedContactKeys() : Array<string> {
    let allKeys : string[] = Object.keys(this.contacts);
    return allKeys.sort((n1,n2) => {
        if (n1.toLowerCase() > n2.toLowerCase()) {
            return 1;
        }

        if (n1.toLowerCase() < n2.toLowerCase()) {
            return -1;
        }

        return 0;
    });
  }

  ngOnInit() {
  }

}
