import { useCallback, useEffect, useState } from "react";
import { getValidationErrors } from "../../../../../core/utils/validation";
import Button from "../../../../Design/Button";
import Input from "../../../../Design/Input";
import * as yup from 'yup';

const schema = yup.object().shape({
    email: yup.string().email().required(),
    userName: yup.string().required(),
});

const defaultData = {
    email: '',
    userName: '',
}

const UserForm = ({onSubmit, initialData={}, disabled}) => {

    const [isTouched, setIsTouched] = useState(false);
    const [data, setData] = useState({
        ...defaultData,
        ...initialData,
    });
    
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const validate = useCallback((data, onSuccess) => {
        schema.validate(data, {abortEarly: false})
        .then(() => {
            if(onSuccess) {
                onSuccess();
            }
        })
        .catch((err) => {
            setErrors(getValidationErrors(err));
        });
    }, []);

    useEffect(() => {
        if(isTouched) {
            validate(data);
        }
    }, [validate, isTouched, data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsTouched(true);
        validate(data, () => onSubmit(data))
    }


    return (
        
        <form noValidate={true} onSubmit={handleSubmit}>

            <Input
                label="Email"
                type="email"
                name="email"
                value={data.email}
                disabled={disabled}
                onChange={handleChange}
                error={errors.email}
            />

            <Input
                label="Username"
                type="text"
                name="userName"
                value={data.userName}
                disabled={disabled}
                onChange={handleChange}
                error={errors.userName}
            />

            <Button className='mt-4' type="submit" disabled={disabled}>
                Update
            </Button>

        </form>
    )

}

export default UserForm;