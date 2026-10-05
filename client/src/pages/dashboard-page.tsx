import { Users, Layers, Webhook, Plug } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const stats = [
  {
    label: 'Profils clients',
    value: '128 430',
    icon: Users,
    hint: '+2.4% cette semaine',
  },
  {
    label: 'Segments actifs',
    value: '24',
    icon: Layers,
    hint: '3 mis à jour aujourd’hui',
  },
  {
    label: 'Événements / 24h',
    value: '1 042 980',
    icon: Webhook,
    hint: '5 sources connectées',
  },
  {
    label: 'Intégrations connectées',
    value: '7',
    icon: Plug,
    hint: '1 en attente de configuration',
  },
]

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Tableau de bord</h1>
        <p className="text-sm text-muted-foreground">
          Vue d’ensemble de votre Customer Data Platform.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-2xl">{stat.value}</CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                {stat.hint}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>À propos de Pulse CDP</CardTitle>
          <CardDescription>
            Pulse CDP collecte les événements de toutes vos sources,
            unifie les profils clients, construit des segments
            d’audience et active ces données vers vos outils marketing.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
