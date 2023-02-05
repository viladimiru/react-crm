import { useListQuery } from '../../store/users/users.api';
import dayjs from 'dayjs';
import { useMemo } from 'react';

function Users() {
	const { data, isLoading } = useListQuery();
	const users = useMemo(
		() =>
			Array.isArray(data) &&
			data.map((user) => {
				return {
					...user, 
					createdAt:dayjs(user.createdAt).format('DD.MM.YYYY HH:mm:ss')
				}
			}),
		[data]
	);
	if (isLoading) {
		return <div className='loading'></div>;
	}
	if (!data?.length) {
		return <span>List is empty</span>;
	}
	return (
		<>
			<div className='users'>
				{users && users.map((user) => (
					<div className='users__card'>
						<span>Username: @{user.username}</span>
						<span>
							Fullname: {user.firstName} {user.lastName}
						</span>
						<span>Private: {user.isPrivate ? 'true' : 'false'}</span>
						<span>Reg date: {user.createdAt}</span>
						<span>Lang: {user.lang}</span>
						<span>Chat ID: {user.chatId}</span>
						<span>User ID: {user.userId}</span>
					</div>
				))}
			</div>
		</>
	);
}

export default Users;
