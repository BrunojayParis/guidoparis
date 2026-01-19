export type ProjectRecord = {
  id: string;
  order: number;
  visible: boolean;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  imageUrl?: string;
};

