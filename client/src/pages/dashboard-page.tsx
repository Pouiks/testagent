import { LayoutDashboard, Users, Layers, Webhook, Plug } from 'lucide-react'

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
    tint: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  },
  {
    label: 'Segments actifs',
    value: '24',
    icon: Layers,
    hint: '3 mis à jour aujourd’hui',
    tint: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
  },
  {
    label: 'Événements / 24h',
    value: '1 042 980',
    icon: Webhook,
    hint: '5 sources connectées',
    tint: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
  {
    label: 'Intégrations connectées',
    value: '7',
    icon: Plug,
    hint: '1 en attente de configuration',
    tint: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  },
]

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <LayoutDashboard className="size-5" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Tableau de bord</h1>
          <p className="text-sm text-muted-foreground">
            Vue d’ensemble de votre Customer Data Platform.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="transition-shadow hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <div
                className={`flex size-8 items-center justify-center rounded-lg ${stat.tint}`}
              >
                <stat.icon className="size-4" />
              </div>
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
