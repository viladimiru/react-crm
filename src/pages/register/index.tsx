import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function Register() {
	const [isLoading, setLoading] = useState(false);
	const onSubmit = async () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			reset({
				login: null,
				password: null,
				firstname: null,
				lastname: null,
				middlename: null,
				acceptance: false
			});
		}, 500);
	};
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			acceptance: false,
			login: null,
			password: null,
			firstname: null,
			lastname: null,
			middlename: null,
		},
		mode: 'all',
	});
	return (
		<>
			<div className='reg-form form'>
				<div className='form-field'>
					<label>Логин</label>
					<input
						{...register('login', { required: true })}
						className='app-input'
						type='text'
					/>
					{errors.login && errors.login.type === 'required' && (
						<small className='error'>Login is required</small>
					)}
				</div>
				<div className='form-field'>
					<label>Пароль</label>
					<input
						{...register('password', { required: true })}
						type='password'
						className='app-input'
					/>
					{errors.password && errors.password.type === 'required' && (
						<small className='error'>Password is required</small>
					)}
				</div>
				<div className='form-field'>
					<label>Имя</label>
					<input
						{...register('firstname', { required: true })}
						className='app-input'
					/>
					{errors.firstname && errors.firstname.type === 'required' && (
						<small className='error'>Firstname is required</small>
					)}
				</div>
				<div className='form-field'>
					<label>Фамилия</label>
					<input
						{...register('lastname', { required: true })}
						className='app-input'
					/>
					{errors.lastname && errors.lastname.type === 'required' && (
						<small className='error'>Lastname is required</small>
					)}
				</div>
				<div className='form-field'>
					<label>Отчество</label>
					<input
						{...register('middlename', { required: true })}
						className='app-input'
					/>
					{errors.middlename && errors.middlename.type === 'required' && (
						<small className='error'>Middlename is required</small>
					)}
				</div>
				<div className='form-field form-field__checkbox'>
					<input
						type='checkbox'
						{...register('acceptance', { required: true })}
						id={'agreement'}
						className='app-checkbox'
					/>
					<label htmlFor={'agreement'}>
						Согласие на обработку персональных данных
					</label>
				</div>
				<button
					disabled={!isValid}
					onClick={handleSubmit(onSubmit)}
					className='button'
				>
					{isLoading ? (
						<div className='loader loader--inherit loader--xs'></div>
					) : (
						'Register'
					)}
				</button>
			</div>
		</>
	);
}

export default Register;
