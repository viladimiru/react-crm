import './index.css';
import { useForm } from 'react-hook-form';
import { useActions } from '../../hooks/actions';

function Login() {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { isValid },
	} = useForm({
		mode: 'all',
		defaultValues: {
			login: null,
			password: null,
		},
	});

	const { setAuth } = useActions();

	const login = (data: any) => {
		if (data.login === 'vlad' && data.password === '123123123') {
			setAuth(true);
		} else {
			console.log('invalid');
		}
	};

	const handleKeyDown = (e: any) => {
		if (e.code === 'Enter') {
			login(getValues());
		}
	};

	return (
		<div className='login-page' onKeyDown={handleKeyDown}>
			<div className='login-form form'>
				<div className='form-field'>
					<label>Login</label>
					<input
						{...register('login', { required: true })}
						data-testid='login'
						className='app-input'
						type='text'
					/>
				</div>
				<div className='form-field'>
					<label>Password</label>
					<input
						{...register('password', { required: true })}
						data-testid='password'
						className='app-input'
						type='text'
					/>
				</div>
				<button
					onClick={handleSubmit(login)}
					disabled={!isValid}
					className='button'
					data-testid='submit'
				>
					Sign in
				</button>
			</div>
		</div>
	);
}

export default Login;
