import { useListQuery } from '../../store/feedback/feedback.api';
import { FeedbackItem } from './FeedbackItem';

function Feedback() {
	const { data, isLoading } = useListQuery();
	if (isLoading) {
		return <div className="loading"></div>;
	}
	if (!data?.length) {
		return <span>List is empty</span>;
	}
	return (
		<div className="feedback">
			{data.map((item) => (
				<FeedbackItem key={item.msg.message_id} {...item.msg} />
			))}
		</div>
	);
}

export default Feedback;
