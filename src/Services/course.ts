export interface Section {
  title: string;
  contents: Content[];
}

export interface Content {
  id: number;
  title: string;
  url: string;
}

export interface Course {
  id: number;
  title: string;
  categoryID: number;
  description: string;
  img: string;
  url: string;
  price: number;
  sections: Section[];
}