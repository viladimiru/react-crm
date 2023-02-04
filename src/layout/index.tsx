import { Outlet } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import Sidebar from './components/sidebar';

function Layout() {
	return (
		<div className='l-grid'>
			<div className='l-grid__sidebar'>
				<Sidebar />
			</div>
			<div className='l-grid__content'>
				<Outlet />
			</div>
		</div>
	);
}

export default Layout;
