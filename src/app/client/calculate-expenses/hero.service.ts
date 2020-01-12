import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {BehaviorSubject, Subject} from "rxjs";
import {Hero} from "../../models/hero";
import {shareReplay} from "rxjs/operators";

@Injectable()
export class HeroService {

  private heroesSubject = new Subject<Hero[]>();

  readonly heroes$ = this.heroesSubject.asObservable().pipe(
    shareReplay(1)
  );

  constructor(private db: AngularFirestore) {
    this.db.collection('/heroes').valueChanges().subscribe(this.heroesSubject);
  }

}
