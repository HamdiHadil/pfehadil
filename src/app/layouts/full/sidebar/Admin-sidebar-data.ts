import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    displayName: 'farmer',
    iconName: 'user',
    route: '/admin/farmer',
  },



  {
    displayName: 'Secteurs',
    iconName: 'arrow-autofit-width',
    route: '/admin/sector',
  },

  {
    displayName: 'Planifications irrigations',
    iconName: 'bucket-droplet',
    route: '/admin/planification',
  },


  {
    displayName: 'Produits',
    iconName: 'vaccine-bottle',
    route: '/admin/product',
  },

  {
    displayName: 'Treatments',
    iconName: 'shield-check',
    route: '/admin/treatment',
  },


  {
    displayName: 'Ouvriers',
    iconName: 'users',
    route: '/admin/ouvrier',
  },

];
