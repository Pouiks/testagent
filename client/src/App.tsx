import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AppLayout } from '@/layouts/app-layout'
import { TooltipProvider } from '@/components/ui/tooltip'
import { DashboardPage } from '@/pages/dashboard-page'
import { IntegrationsPage } from '@/pages/integrations-page'
import { ProfilesPage } from '@/pages/profiles-page'
import { SegmentsPage } from '@/pages/segments-page'
import { SourcesPage } from '@/pages/sources-page'

function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="profiles" element={<ProfilesPage />} />
            <Route path="segments" element={<SegmentsPage />} />
            <Route path="sources" element={<SourcesPage />} />
            <Route path="integrations" element={<IntegrationsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  )
}

export default App
