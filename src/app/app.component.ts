import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user = {};

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(user => {
      console.log('---->', user)
      if (user) {
        this.user = user.auth.providerData[0];
      }
      else {
        this.user = {};
      }
    });
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  logout = function () {
    this.af.auth.logout();
  }

}
