import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import Sidebar from './components/sidebar';
import { selectAuth } from '../store/auth/auth.slice';
import { useEffect } from 'react';

function Layout() {
	const nav = useNavigate();
	const location = useLocation();
	const { isAuthed } = useAppSelector(selectAuth);
	useEffect(() => {
		if (!isAuthed) {
			nav('/login', {
				replace: true,
			});
		} else if (isAuthed && location.pathname === '/login') {
			nav('/', {
				replace: true,
			});
		}
	}, [isAuthed]);
	return (
		<div className="l-grid">
			<div className="l-grid__sidebar">
				<Sidebar />
			</div>
			<div className="l-grid__content">
				<Outlet />
			</div>
		</div>
	);
}

export default Layout;
