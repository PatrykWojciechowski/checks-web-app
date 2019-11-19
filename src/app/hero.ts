export class Hero{
  constructor(id: number, name: string, title: string, imageUrl: string) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.imageUrl = imageUrl;
  }
  id: number;
  name: string;
  title: string;
  imageUrl: string;
}

export const HEROES: Hero[] = [
  new Hero(0, "Patryk", "", ""),
  new Hero(1, "Piotr", "", ""),
  new Hero(2, "Przemek", "", "")
];
