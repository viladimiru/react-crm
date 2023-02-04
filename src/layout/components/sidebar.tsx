import { useLocation, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useEffect, useState } from 'react';
import classnames from 'classnames';

const toggleTheme = () => {
	const node = document.getElementById('style-direction') as HTMLLinkElement
	const prev = node.href.match('(dark|light)')![0]
	const next = {
		dark: 'light',
		light: 'dark'
	}[prev]
	node.href = node.href.replace(prev, next!)
	return next!
}

function Sidebar() {
	const [theme, setTheme] = useState('dark')
	const location = useLocation();

	useEffect(() => {
		setSidebarVisibility(false);
	}, [location]);
	const [sidebarVisibility, setSidebarVisibility] = useState(false);
	const sidebarClasses = classnames({
		sidebar: true,
		'sidebar--active': sidebarVisibility,
	});

	const toggleVisibility = () => setSidebarVisibility(!sidebarVisibility);
	const onToggleTheme = () => {
		setTheme(toggleTheme())
	}
	const darkClass = classnames({
		active: theme === 'dark'
	})
	const lightClass = classnames({
		active: theme === 'light'
	})

	return (
		<>
			<div className='sidebar-mobile' onClick={toggleVisibility}>
				<FontAwesomeIcon
					className='burger-toggler'
					icon={sidebarVisibility ? solid('xmark') : solid('bars')}
					size='2x'
				/>
			</div>
			<div className={sidebarClasses}>
				<ul>
					<NavLink className='text-link' to='/'>
						<li>Главная</li>
					</NavLink>
					<NavLink className='text-link' to='/cats'>
						<li>Котики</li>
					</NavLink>
					<NavLink className='text-link' to='/register'>
						<li>Регистрация</li>
					</NavLink>
				</ul>
				<div className='theme-list'>
					<FontAwesomeIcon className={darkClass} onClick={onToggleTheme} size='2x' icon={solid('moon')} />
					<FontAwesomeIcon className={lightClass} onClick={onToggleTheme} size='2x' icon={solid('sun')} />
				</div>
			</div>
		</>
	);
}

export default Sidebar;
