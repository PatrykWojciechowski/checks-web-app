import { Component } from '@angular/core';

class Hero{
  constructor(name: string, title: string, imageUrl: string) {
    this.name = name;
    this.title = title;
    this.imageUrl = imageUrl;
  }
  name: string;
  title: string;
  imageUrl: string;
}

let HEROES: Hero[] = [
  new Hero("Patryk", "", ""),
  new Hero("Piotr", "", ""),
  new Hero("Przemek", "", "")
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'checks-app';
  heroes = HEROES;

  chooseHero() {
    console.log("Hero chosen!")
  }
}
