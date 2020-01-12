import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {switchMap} from "rxjs/operators";
import {User} from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //TODO display on login page
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  private user: User = null;

  //TODO use when registration
  private newUser: any;
  private authState: any;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private router: Router) {
    this.afAuth.authState
      .pipe(
        switchMap(user => {
          this.authState = user;
          return this.db.doc(`users/${user.uid}`).valueChanges();
    })).subscribe((user: User) => this.user = user);
  }

  get currentUser() {
    return this.user;
  }

  get authenticated() {
    return this.authState != null;
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }


  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if (userCredential) {
          const user = userCredential.user;
          this.updateUserData(user);
          this.router.navigateByUrl('client');
        }
      })
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

  //TODO REGISTRATION -> implement in the future
  createUser(user) {
    console.log(user);
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.newUser = user;
        console.log(userCredential);
        userCredential.user.updateProfile({
          displayName: user.firstName + ' ' + user.lastName
        });

        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(['/home']);
          });
      })
      .catch(error => {
        this.eventAuthError.next(error);
      });
  }

  addFlatemateIdToUser(flatmateId: number) {
    const currentUser = this.currentUser;
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${currentUser.uid}`);

    const data = {
      flatmateId: flatmateId
    };

    return userRef.set({...currentUser, flatmateId}, {merge: true})
  }

  private insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      role: 'network user'
    })
  }

}
