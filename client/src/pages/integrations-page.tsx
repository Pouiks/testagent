import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const integrations = [
  {
    name: 'Google Ads',
    category: 'Publicité',
    status: 'Connectée',
  },
  {
    name: 'Salesforce',
    category: 'CRM',
    status: 'Connectée',
  },
  {
    name: 'Mailchimp',
    category: 'Email marketing',
    status: 'Connectée',
  },
  {
    name: 'Slack',
    category: 'Notifications internes',
    status: 'Connectée',
  },
  {
    name: 'Webhook personnalisé',
    category: 'Autre',
    status: 'Non configurée',
  },
]

export function IntegrationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Intégrations</h1>
        <p className="text-sm text-muted-foreground">
          Destinations connectées pour activer les données client dans vos
          autres outils.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {integrations.map((integration) => (
          <Card key={integration.name}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>{integration.name}</CardTitle>
                <CardDescription>{integration.category}</CardDescription>
              </div>
              <Badge
                variant={
                  integration.status === 'Connectée' ? 'default' : 'outline'
                }
              >
                {integration.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <Button
                variant={
                  integration.status === 'Connectée' ? 'outline' : 'default'
                }
                size="sm"
              >
                {integration.status === 'Connectée'
                  ? 'Gérer'
                  : 'Configurer'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
