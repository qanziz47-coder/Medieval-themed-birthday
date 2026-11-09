export type Photo = {
  id: string;
  src: string;
  caption: string;
  date: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
};

export const photos: Photo[] = [
  {
    id: 'p1',
    src: '7.jpeg', 
    caption: 'indahnya hidup',
    date: '2025',
    // Y diturunkan sedikit agar tali terlihat
    position: [-3, 0, 0],
    rotation: [0, 0.1, 0],
  },
  {
    id: 'p2',
    src: 'k1.jpeg',
    caption: 'okey lah ini aduhh doksli tuhh',
    date: 'ini gak tau gabut',
    position: [2.5, -1.5, -1],
    rotation: [0, -0.1, 0],
  },
  {
    id: 'p3',
    src: 'k2.jpeg',
    caption: 'ini mah pas bikin video aduhh itu dokslinya tuhhh',
    date: 'kamera di kamera',
    position: [0, 1, -2],
    rotation: [0, 0, 0],
    scale: 1,
  },
];