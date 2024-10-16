import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './components/auth';
import { Deconnexion } from './pages/deconnexion';
import { RouteError } from './pages/error/Error';
import { Optional } from './pages/optional';
import { Portail, RoutingPortail } from './pages/portail';
import { PostSubmit } from './pages/postSubmit';
import { Questionnaire } from './pages/questionnaire';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const router = createBrowserRouter([
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
]);

export function App() {
	return (
		<Provider store={store}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</Provider>
	);
}
