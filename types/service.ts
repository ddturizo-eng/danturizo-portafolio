import { type StaticImageData } from 'next/image';

export interface Service {
  title: string;
  description: string;
  technologies: string[];
}

export interface CarouselImage {
  src: StaticImageData;
  alt: string;
}
