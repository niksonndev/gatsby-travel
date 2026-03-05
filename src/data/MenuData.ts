export interface MenuItem {
  title: string;
  link: string;
}

export const menuData: MenuItem[] = [
  { title: 'About', link: '/about', translationKey: 'about' } as any,
  { title: 'Trips', link: '/trips', translationKey: 'trips' } as any,
  { title: 'Careers', link: '/careers', translationKey: 'careers' } as any,
  { title: 'Contact', link: '/contact', translationKey: 'contact' } as any,
];
