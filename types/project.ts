import { type StaticImageData } from 'next/image';

export type ProjectSize = 'large' | 'featured' | 'medium';

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: StaticImageData;
  size: ProjectSize;
  tech: string[];
}
