import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useState, useMemo, useCallback } from 'react';
import classnames from 'classnames';
import { useAppSelector } from '../../hooks/redux';
import { selectAuth } from '../../store/auth/auth.slice';

const toggleTheme = () => {
	const node = document.getElementById('style-direction') as HTMLLinkElement;
	const prev = node.href.match('(dark|light)')![0];
	const next = {
		dark: 'light',
		light: 'dark',
	}[prev];
	node.href = node.href.replace(prev, next!);
	return next!;
};

function Sidebar() {
	const [theme, setTheme] = useState('dark');
	const [sidebarVisibility, setSidebarVisibility] = useState(false);

	const sidebarClasses = useMemo(
		() =>
			classnames({
				sidebar: true,
				'sidebar--active': sidebarVisibility,
			}),
		[sidebarVisibility]
	);

	const toggleVisibility = useCallback(() => {
		setSidebarVisibility(!sidebarVisibility);
	}, [sidebarVisibility]);

	const onToggleTheme = () => {
		setTheme(toggleTheme());
	};

	const darkClass = useMemo(
		() =>
			classnames({
				active: theme === 'dark',
			}),
		[theme]
	);

	const lightClass = useMemo(
		() =>
			classnames({
				active: theme === 'light',
			}),
		[theme]
	);

	const { isAuthed } = useAppSelector(selectAuth);

	const navList = useMemo(() => {
		if (isAuthed) {
			return [
				{
					text: 'Пользователи',
					link: '/',
				},
				{
					text: 'Отзывы',
					link: '/feedback',
				},
				{
					text: 'Рассылка',
					link: '/mailing',
				},
				{
					text: 'Логи',
					link: '/logs',
				},
			];
		}
		return [
			{
				text: 'Логин',
				link: '/login',
			},
		];
	}, [isAuthed]);

	return (
		<>
			<div className="sidebar-mobile" onClick={toggleVisibility}>
				<FontAwesomeIcon
					className="burger-toggler"
					icon={sidebarVisibility ? solid('xmark') : solid('bars')}
					size="2x"
					style={{ width: '28px' }}
				/>
			</div>
			<div className={sidebarClasses}>
				<div className="menu">
					<div className="logo">
						<img src="/flamingo.png" alt="logo" />
						<h3>Flamingo House</h3>
					</div>
					<ul onClick={toggleVisibility}>
						{navList.map((item) => (
							<NavLink key={item.link} className="text-link" to={item.link}>
								<li>{item.text}</li>
							</NavLink>
						))}
					</ul>
				</div>
				<div className="theme-list">
					<FontAwesomeIcon
						className={darkClass}
						onClick={onToggleTheme}
						size="2x"
						icon={solid('moon')}
					/>
					<FontAwesomeIcon
						className={lightClass}
						onClick={onToggleTheme}
						size="2x"
						icon={solid('sun')}
					/>
				</div>
			</div>
		</>
	);
}

export default Sidebar;
