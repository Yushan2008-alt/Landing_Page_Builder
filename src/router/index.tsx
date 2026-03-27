import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { DashboardPage } from '../pages/DashboardPage'
import { BuilderPage } from '../pages/BuilderPage'
import { AiGeneratorPage } from '../pages/AiGeneratorPage'

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/builder/:projectId', element: <BuilderPage /> },
      { path: '/ai-generator', element: <AiGeneratorPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
