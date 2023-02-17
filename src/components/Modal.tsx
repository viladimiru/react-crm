import RModal, {Props} from 'react-modal';

export function Modal({children, ...props}: Props) {
	return (
		<RModal
			{...props}
			style={{
				content: {
					...modalStyles.content,
					...props.style?.content || {}
				},
				overlay: {
					...modalStyles.overlay,
					...props.style?.overlay || {}
				}
			}}
		>
			{children}
		</RModal>
	);
}


const modalStyles = {
	content: {
		backgroundColor: 'var(--bg-color)',
		borderColor: 'var(--bg-color-opacity)',
	},
	overlay: {
		backgroundColor: 'var(--bg-color-opacity)',
	},
}