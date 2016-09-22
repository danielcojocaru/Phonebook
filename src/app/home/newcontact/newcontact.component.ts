import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CookiesHandler } from '../cookies.service';
import { ContactslistComponent } from '../contactslist/contactslist.component'


@Component({
  moduleId: module.id,
  selector: 'app-newcontact',
  templateUrl: 'newcontact.component.html',
  styleUrls: ['newcontact.component.css']
})
export class NewcontactComponent implements OnInit {
  c : CookiesHandler;
  @Output() onNewContact = new EventEmitter();

  // the next 6 params are used to change the input values and their classes when they are focused or blured
  inputVal : string[] = ['Name','Telefonnummer'];
  defaultInputVal : string[] = ['Name','Telefonnummer'];

  inputClass : string[] = ['empthy','empthy'];
  defaultInputClass : string = 'empthy';
  validInputClass : string = 'clicked';
  errorInputClass : string = 'error-input';

  // the next 4 paramas are used in the process of validating the inserted values
  allowedChrs : string[] = ['0','1','2','3','4','5','6','7','8','9','.',' ','+'];
  lblMessage : string[] = ['', ''];
  lblDefMessage : string = '';
  errorMessage : string[] = ['please insert a valid name', 'please insert a valid phone number'];

  constructor(cookiesHandler : CookiesHandler) {
    this.c = cookiesHandler;
  }

  fireNewContactEvent(e){
    this.onNewContact.emit(e);
  }

  addNewContact(){
    this.resetToDefaultView();

    if(this.contactInfosCorrectlyInserted()){
      let theEvent : any = {};
      theEvent[this.inputVal[0]] = this.inputVal[1];

      this.fireNewContactEvent(theEvent);
      this.resetToBlurView();
    }
  }

  contactInfosCorrectlyInserted(){
    let isValid : boolean = true;
    for(let i = 0; i < 2; i++){
      if(this.inputClass[i] == this.defaultInputClass){
        isValid = false;
        this.alertErrorInput(i);
      }
    }

    if(!this.stringIsInAllowedChrs(this.inputVal[1], this.allowedChrs)){
      isValid = false;
      this.alertErrorInput(1);
    }

    return isValid;
  }

  resetToDefaultView(){
    for(let i = 0; i < this.lblMessage.length; i++){
      this.lblMessage[i] = this.lblDefMessage;
    }
  }

  resetToBlurView(){
    for(let i = 0; i < this.inputVal.length; i++){
      this.inputVal[i] = this.defaultInputVal[i];
      this.inputClass[i] = this.defaultInputClass;
    }
  }

  removeStringFromString(theString, theChildString){
    let startIndex : number = theString.indexOf(theChildString);
    if(startIndex > -1){
    console.log(theString.substring(startIndex, theChildString.length));
      return theString.substring(startIndex, theChildString.length);
    }
    else{
     return theString;
    }
  }

  alertErrorInput(index){
    this.lblMessage[index] = this.errorMessage[index];
    this.inputClass[index] = this.inputClass[index] + ' ' + this.errorInputClass;
  }

  stringIsInAllowedChrs(theString, chrs){
    let toReturn : boolean = true;
    for(let i = 0; i < theString.length; i++){
      let match : boolean = false;
      for(let j = 0; j < chrs.length; j++){

        if(theString[i] == chrs[j]){
          match = true;
        }
      }
      if(match == false){
        toReturn = false;
      }
    }
    return toReturn;
  }

  focusFunction(elementIndex){
    if(this.inputClass[elementIndex].indexOf(this.defaultInputClass) > -1){
      this.inputClass[elementIndex] = this.validInputClass;
      this.inputVal[elementIndex] = '';
    }
    this.inputClass[elementIndex] = this.removeStringFromString(this.inputClass[elementIndex], this.errorInputClass);
  }

  blurFunction(elementIndex){
    if(this.inputVal[elementIndex] == ''){
      this.inputClass[elementIndex] = this.defaultInputClass;
      this.inputVal[elementIndex] = this.defaultInputVal[elementIndex];
    }
  }

  ngOnInit() {

  }

}
