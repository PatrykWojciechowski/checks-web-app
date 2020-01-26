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
