import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/main';
import { Provider } from 'react-redux';
import { store } from './store';
import Cats from './pages/cats';
import Layout from './layout/index';
import Login from './pages/login';
import Users from './pages/users';
import Feedback from './pages/feedback';
import Mailing from './pages/mailing';
import Logs from './pages/logs';
import Modal from 'react-modal'


const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Main />,
			},
			{
				path: '/cats',
				element: <Cats />,
			},
			{
				path: '/login',
				element: <Login/>
			},
			{
				path: '/users',
				element: <Users/>
			},
			{
				path: 'feedback',
				element: <Feedback/>
			},
			{
				path: 'mailing',
				element: <Mailing/>
			},
			{
				path: 'logs',
				element: <Logs/>
			}
		],
	},
]);

Modal.setAppElement(('#modal'))

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	// <React.StrictMode> AVOID useEffect/useLayoutEffect RECALL
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const appHeight = () => {
	const doc = document.documentElement
	doc.style.setProperty('--app-height', `${window.innerHeight}px`)
 }
 window.addEventListener('resize', appHeight)
 appHeight()