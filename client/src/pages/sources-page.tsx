import { Webhook } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const sources = [
  {
    name: 'Site web',
    type: 'JavaScript (navigateur)',
    volume: '612 300 événements / 24h',
    status: 'Connectée',
  },
  {
    name: 'Application mobile',
    type: 'SDK iOS / Android',
    volume: '348 120 événements / 24h',
    status: 'Connectée',
  },
  {
    name: 'API serveur',
    type: 'Événements server-to-server',
    volume: '81 560 événements / 24h',
    status: 'Connectée',
  },
  {
    name: 'Import CSV',
    type: 'Import manuel',
    volume: 'Dernier import il y a 3 jours',
    status: 'En attente',
  },
]

export function SourcesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Webhook className="size-5" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Sources de données</h1>
          <p className="text-sm text-muted-foreground">
            Flux d’événements entrants qui alimentent les profils clients.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sources.map((source) => (
          <Card
            key={source.name}
            className="transition-shadow hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>{source.name}</CardTitle>
                <CardDescription>{source.type}</CardDescription>
              </div>
              <Badge
                variant={
                  source.status === 'Connectée' ? 'success' : 'warning'
                }
              >
                {source.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {source.volume}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
