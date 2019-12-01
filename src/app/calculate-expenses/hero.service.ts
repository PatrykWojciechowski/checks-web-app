import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Subject} from "rxjs";
import {Hero} from "../hero";

@Injectable()
export class HeroService {

  private heroesSubject = new Subject<Hero[]>();
  readonly heroes$ = this.heroesSubject.asObservable().pipe();

  constructor(private db: AngularFirestore) {
    console.log('invoking constructor of HeroService');
    this.db.collection('/heroes').valueChanges().subscribe(this.heroesSubject);
  }

}
