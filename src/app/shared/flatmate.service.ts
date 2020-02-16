import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {BehaviorSubject, Subject} from "rxjs";
import {shareReplay} from "rxjs/operators";
import {Flatmate} from '../models/expense.model';
import {AuthService} from './auth.service';

@Injectable()
export class FlatmateService {

  private flatmatesSub = new Subject<Flatmate[]>();
  readonly flatmates$ = this.flatmatesSub.asObservable().pipe(
    shareReplay(1)
  );

  private _flatmates: Flatmate[];
  private currentFlatmateSub = new BehaviorSubject<Flatmate>(null);
  readonly currentFlatmate$ = this.currentFlatmateSub.asObservable();

  constructor(
    private db: AngularFirestore,
    private authService: AuthService
  ) {
    this.db.collection('/heroes').valueChanges()
      .subscribe((flatmates: Flatmate[]) => {
        this._flatmates = flatmates;
        this.flatmatesSub.next(flatmates);
        const currentFlatmate = flatmates.find(hero => hero.id == this.authService.currentUser.flatmateId.toString());
        this.currentFlatmateSub.next(currentFlatmate);
      });
  }

  get flatmates(){
    return this._flatmates;
  }

}
