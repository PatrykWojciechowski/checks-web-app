export class Hero{
  constructor(name: string, title: string, imageUrl: string) {
    this.name = name;
    this.title = title;
    this.imageUrl = imageUrl;
  }
  name: string;
  title: string;
  imageUrl: string;
}

export const HEROES: Hero[] = [
  new Hero("Patryk", "", ""),
  new Hero("Piotr", "", ""),
  new Hero("Przemek", "", "")
];
