import { useListQuery } from '../../store/feedback/feedback.api';

function Feedback() {
	const { data, isLoading } = useListQuery();
	if (isLoading) {
		return <div className="loading"></div>;
	}
	if (!data?.length) {
		return <span>List is empty</span>
	}
	return (
		<div className='feedback'>
			{
				data.map((item) => (
					<div className='default__card'>
						<span>
							User: {item.msg.from.username}
						</span>
						<span>
							Firstname: {item.msg.from.first_name}
						</span>
						<span>
							Language: {item.msg.from.language_code}
						</span>
						<span>
							Message: {item.msg.text}
						</span>
					</div>
				))
			}
		</div>
	);
}

export default Feedback;
