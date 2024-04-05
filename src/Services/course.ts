export interface Section {
  title: string;
  sections: Content[];
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
  price: number;
  sections: Section[];
  
}

export interface Category {
  id: number;
}