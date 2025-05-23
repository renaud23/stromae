import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { AuthProvider } from './components/AuthProvider/AuthProvider'
import { Deconnexion } from './pages/deconnexion'
import { RouteError } from './pages/error/Error'
import { Optional } from './pages/optional'
import { Portail, RoutingPortail } from './pages/portail'
import { PostSubmit } from './pages/postSubmit'
import { Questionnaire } from './pages/questionnaire'
import { Welcome } from './pages/welcome'

const router = createBrowserRouter(
  [
    {
      path: '/questionnaire/:survey',
      element: <Portail />,
      errorElement: <RouteError />,
    },
    {
      path: '/questionnaire/:survey/unite-enquetee/:unit/post-envoi',
      element: <PostSubmit />,
      errorElement: <RouteError />,
    },
    {
      path: '/questionnaire/:survey/unite-enquetee/:unit/accueil',
      element: <Welcome />,
      errorElement: <RouteError />,
    },
    {
      path: '/questionnaire/:survey/unite-enquetee/:unit/deconnexion',
      element: <Deconnexion />,
      errorElement: <RouteError />,
    },
    {
      path: '/questionnaire/:survey/unite-enquetee/:unit',
      element: <Questionnaire />,
      errorElement: <RouteError />,
    },
    {
      path: '/questionnaire/:survey/423/:errorType',
      element: <RouteError code={423} />,
      errorElement: <RouteError />,
    },
    {
      path: '/questionnaire/:survey/:optional',
      element: <Optional />,
      errorElement: <RouteError />,
    },
    {
      path: '/404',
      element: <RouteError />,
      errorElement: <RouteError />,
    },
    {
      path: '/423',
      element: <RouteError code={423} />,
      errorElement: <RouteError />,
    },
    {
      path: '/',
      element: <RoutingPortail />,
      errorElement: <RouteError />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
)

export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
