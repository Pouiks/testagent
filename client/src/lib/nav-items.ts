import {
  LayoutDashboard,
  Users,
  Layers,
  Webhook,
  Plug,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  title: string
  url: string
  icon: LucideIcon
  description: string
}

export const navItems: NavItem[] = [
  {
    title: 'Tableau de bord',
    url: '/',
    icon: LayoutDashboard,
    description: "Vue d'ensemble de la plateforme de données client",
  },
  {
    title: 'Profils clients',
    url: '/profiles',
    icon: Users,
    description: "Vue unifiée (360°) des clients, construite à partir de toutes les sources",
  },
  {
    title: 'Segments',
    url: '/segments',
    icon: Layers,
    description: 'Audiences dynamiques calculées à partir des profils clients',
  },
  {
    title: 'Sources de données',
    url: '/sources',
    icon: Webhook,
    description: "Flux d'événements entrants (web, mobile, serveur, import)",
  },
  {
    title: 'Intégrations',
    url: '/integrations',
    icon: Plug,
    description: 'Destinations connectées pour activer les données client',
  },
]
