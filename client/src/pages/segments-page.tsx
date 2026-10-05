import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const segments = [
  {
    name: 'VIP',
    condition: 'Valeur vie client > 1 000 € ET achats ≥ 3',
    size: '4 210 profils',
    status: 'Actif',
  },
  {
    name: 'Panier abandonné',
    condition: 'Panier créé sans commande depuis 24h',
    size: '1 875 profils',
    status: 'Actif',
  },
  {
    name: 'Essai gratuit',
    condition: "Inscrit à l'essai gratuit depuis moins de 14 jours",
    size: '932 profils',
    status: 'Actif',
  },
  {
    name: 'Inactifs 90 jours',
    condition: 'Aucun événement depuis 90 jours',
    size: '12 044 profils',
    status: 'En pause',
  },
]

export function SegmentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Segments</h1>
        <p className="text-sm text-muted-foreground">
          Audiences dynamiques, recalculées en continu à partir des profils
          clients.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {segments.map((segment) => (
          <Card key={segment.name}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>{segment.name}</CardTitle>
                <CardDescription>{segment.condition}</CardDescription>
              </div>
              <Badge
                variant={segment.status === 'Actif' ? 'default' : 'outline'}
              >
                {segment.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{segment.size}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
