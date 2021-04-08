import { useState } from 'react';
import Button from '../../Design/Button';
import Container from '../../Design/Container';
import Input from '../../Design/Input';
import Styles from './LoginPage.module.scss';
import * as yup from 'yup';
import { getValidationErrors } from '../../../core/utils/validation';
import ApiError from '../../../core/error/ApiError';
import AppError from '../../../core/error/AppError';
import { login } from '../../../core/modules/auth/api';
import { handleApiResult }  from '../../../core/utils/api';
import ErrorAlert from '../../Shared/ErrorAlert';

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginPage = ({ setUser }) => {

    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [error, setError] = useState();

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        schema.validate(data,{abortEarly: false})
        .then(() => {
            login(data)
                .then((res) => handleApiResult(res))
                .then((data) => {
                    setUser(data);
                })
                .catch((e) => {
                    if (e instanceof ApiError) {
                        if (e.isUnauthorized()) {
                            setError(new AppError('Wrong combination'));
                        } else {
                            setError(e);
                        }
                    } else {
                        setError(new AppError(e));
                    }
                })
        
        })
        .catch((e) => {
            setErrors(getValidationErrors(e));
        })
    };

    return(
        <Container>
            <div className="text-center">
                <form className={Styles['form-signin']} onSubmit={handleSubmit} noValidate={true}>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <ErrorAlert error={error}></ErrorAlert>

                    <label htmlFor="email" className="sr-only">Email address</label>
                    <Input type="email" name="email" value={data.email} onChange={handleChange} error={errors.email} />
                    
                    <label htmlFor="password" className="sr-only">Password</label>
                    <Input type="password" name="password" value={data.password} onChange={handleChange} error={errors.password} />

                    <Button color="primary" type="submit">Sign in</Button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2021-∞</p>
                </form>
            </div>
        </Container>
    )
}

export default LoginPage;