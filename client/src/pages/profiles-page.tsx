import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const profiles = [
  {
    name: 'Alice Martin',
    email: 'alice.martin@example.com',
    segments: ['VIP', 'Newsletter'],
    lastSeen: 'il y a 2 heures',
    lifetimeValue: '1 240 €',
  },
  {
    name: 'Bruno Lefèvre',
    email: 'bruno.lefevre@example.com',
    segments: ['Panier abandonné'],
    lastSeen: 'il y a 1 jour',
    lifetimeValue: '85 €',
  },
  {
    name: 'Chloé Dupont',
    email: 'chloe.dupont@example.com',
    segments: ['VIP'],
    lastSeen: 'il y a 5 minutes',
    lifetimeValue: '3 560 €',
  },
  {
    name: 'David Nguyen',
    email: 'david.nguyen@example.com',
    segments: ['Essai gratuit'],
    lastSeen: 'il y a 3 jours',
    lifetimeValue: '0 €',
  },
]

export function ProfilesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Profils clients</h1>
        <p className="text-sm text-muted-foreground">
          Vue 360° de chaque client, reconstruite à partir de toutes vos
          sources de données.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profils unifiés</CardTitle>
          <CardDescription>
            {profiles.length} profils récents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Segments</TableHead>
                <TableHead>Dernière activité</TableHead>
                <TableHead className="text-right">
                  Valeur vie client
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.email}>
                  <TableCell>
                    <div className="font-medium">{profile.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {profile.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {profile.segments.map((segment) => (
                        <Badge key={segment} variant="secondary">
                          {segment}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{profile.lastSeen}</TableCell>
                  <TableCell className="text-right">
                    {profile.lifetimeValue}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
