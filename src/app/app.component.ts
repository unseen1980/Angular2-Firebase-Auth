import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user = {};
  items: FirebaseListObservable<any[]>;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(user => {
      console.log('---->', user)
      if (user) {
        this.user = user.auth.providerData[0];
        this.items = af.database.list('/items');
      }
      else {
        this.user = {};
        this.items = null;
      }
    });
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  logout() {
    this.af.auth.logout();
  }

  isUserLoggedIn() {
    return (Object.keys(this.user).length === 0);
  }

}
