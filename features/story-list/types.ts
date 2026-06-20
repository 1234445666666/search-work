export interface ISlide {
  id: number;
  imageUrl: string;
  text: string;
  link: string;
}

export interface IStory {
  id: number;
  preview: string;
  title: string;
  slides: ISlide[];
}
