import { useMemo } from 'react';
import RModal, { Props, Styles } from 'react-modal';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './index.css';

interface ExtendedProps extends Props {
	hideCloseBtn?: boolean;
}

export function Modal({ children, ...props }: ExtendedProps) {
	const styles = useMemo(
		() => ({
			content: {
				...modalStyles.content,
				...(props.style?.content || {}),
			},
			overlay: {
				...modalStyles.overlay,
				...(props.style?.overlay || {}),
			},
		}),
		[props.style?.overlay, props.style?.content]
	);
	const getClassName = useMemo(() => {
		let className = ['ReactModal__Content'];
		if (props.className) {
			className.push(props.className as string);
		}
		return classnames(className);
	}, [props.className]);
	return (
		<RModal
			{...props}
			style={styles}
			className={getClassName}
			closeTimeoutMS={500}
		>
			{!props.hideCloseBtn && (
				<div className='modal__close' onClick={props.onRequestClose}>
					<FontAwesomeIcon icon={solid('xmark')} size='xl' />
				</div>
			)}
			{children}
		</RModal>
	);
}

const modalStyles: Styles = {
	overlay: {
		backgroundColor: 'var(--overlay-color)',
		position: 'fixed',
		inset: '0px',
	},
};
