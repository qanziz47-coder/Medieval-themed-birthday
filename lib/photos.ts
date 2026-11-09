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
    src: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=500&auto=format&fit=crop', 
    caption: 'Awal dari segalanya.',
    date: 'Maret 2023',
    // Y diturunkan sedikit agar tali terlihat
    position: [-3, 0, 0],
    rotation: [0, 0.1, 0],
  },
  {
    id: 'p2',
    src: 'https://images.unsplash.com/photo-1499336315816-097655dcfbda?q=80&w=500&auto=format&fit=crop',
    caption: 'Momen yang tidak akan terlupakan.',
    date: 'Juli 2023',
    position: [2.5, -1.5, -1],
    rotation: [0, -0.1, 0],
  },
  {
    id: 'p3',
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500&auto=format&fit=crop',
    caption: 'Belajar dan bertumbuh bersama.',
    date: 'Desember 2023',
    position: [0, 1, -2],
    rotation: [0, 0, 0],
    scale: 1,
  },
];