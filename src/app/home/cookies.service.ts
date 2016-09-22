// saves, changes (edit/delete) contacts from cookies
// also delivers the contacts having a given sequence of letters >> getAllContactsHaving(word)
export class CookiesHandler{

  contactsCookie : string = "contacts";
  expireDays : number = 365;


  public getAllContactsHaving(word){
    let allContacts : Object = this.getAllContactsFromCookie();

    if(word == ''){
      return allContacts;
    }
    else{
        let allNames : string[] = Object.keys(allContacts);

        allNames.forEach((name: string) => {
          if(name.toLowerCase().indexOf(word.toLowerCase()) == -1){
            delete allContacts[name];
          }
        });

        return allContacts;
    }
  }

  public deleteContact(contact){
    let allContacts : Object = this.getAllContactsFromCookie();
    delete allContacts[contact];

    let toBeAddedToCookie = this.getStringFromObject(allContacts);

    this.setCookie(this.contactsCookie, toBeAddedToCookie, this.expireDays);
  }

  private getStringFromObject(theObject){
    let toReturn : string = '';
    let names : string[] = Object.keys(theObject);

    for (let name of names) {
      let comma : string = ',';
      if(toReturn == ''){
        comma = '';
      }
      toReturn += comma + name + '/' + theObject[name];
    }
    return toReturn;
  }

  public saveContactToCookie(name : string, phone : string){
    this.appendCookie(this.removeUnwantedLettersFromString(name) + '/' + phone, this.contactsCookie);
  }

  public getAllContactsFromCookie(){
    return this.getObjectFromString(this.getCookie(this.contactsCookie), ',', '/');
  }

  private getObjectFromString(theString : string, firstSep : string, secondSep : string){
    let firstSplit : string[] = this.getArrayFromString(theString, firstSep);

    let toReturn = {};
    for (let contact of firstSplit) {
      let secondSplit : string[] = this.getArrayFromString(contact, '/');

      let name : string = secondSplit[0];
      let phone : string = secondSplit[1];

      toReturn[name] = phone;
    }
    return toReturn;
  }

  private getArrayFromString(theString : string, separator : string){
    if(theString.indexOf(separator) > -1){
      return theString.split(separator);
    }
    else{
      let toReturn : string[] = [theString];
      return toReturn;
    }
  }

  private appendCookie(toBeAddedToCookie : string, cookieName : string){
    if(this.getCookie(cookieName) != ''){
      toBeAddedToCookie = ',' + toBeAddedToCookie;
    }

    toBeAddedToCookie = this.getCookie(cookieName) + toBeAddedToCookie;

    this.setCookie(cookieName, toBeAddedToCookie, this.expireDays);
  }

  public getCookie(cookieName: string) {
    let splited : string = document.cookie.split(cookieName + '=')[1];
    if(splited == undefined){
      splited = '';
    }
    if(splited.indexOf(';') > -1){
      splited = splited.split(';')[0];
    }
    return splited;
  }

  public setCookie(name: string, value: string, expireDays: number, path: string = "") {

    let d:Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires:string = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + (path.length > 0 ? "; path=" + path : "");

  }

  private removeUnwantedLettersFromString(theString){
    theString = theString.replace(/,/g, '.');
    theString = theString.replace(/\//g, '-');
    return theString;
  }


}
