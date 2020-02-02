import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import * as firebase from 'firebase';
import {User} from '../models/expense.model';

@Injectable()
export class AuthService {

  //TODO display on login page
  private eventAuthErrorSub = new BehaviorSubject<string>("");
  readonly eventAuthError$ = this.eventAuthErrorSub.asObservable();

  private userDataSub = new BehaviorSubject<User>(null);
  readonly userData$ = this.userDataSub.asObservable();

  readonly authenticated$: Observable<boolean> = this.afAuth.authState.pipe(
    map(auth => auth ? true : false)
  );

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.afAuth.authState
      .pipe(
        switchMap((user: firebase.User) => this.getUser(user.uid)))
      .subscribe(this.userDataSub);
  }

  get currentUser() {
    return this.userDataSub.getValue();
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthErrorSub.next(error);
      })
      .then(userCredential => {
        if (userCredential) {
          const user = userCredential.user;
          this.updateUserData(user);
          this.router.navigateByUrl('/client');
        }
      })
  }

  //TODO to be enabled
  addFlatemateIdToUser(flatmateId: number) {
    const currentUser = this.currentUser;
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${currentUser.uid}`);

    const data = {
      flatmateId: flatmateId
    };

    return userRef.set({...currentUser, flatmateId}, {merge: true})
  }

  private getUser(uid: string) {
    return this.db.doc(`users/${uid}`).valueChanges()
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, {merge: true})
  }

}
