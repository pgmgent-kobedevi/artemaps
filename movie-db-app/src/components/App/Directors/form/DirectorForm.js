import { useCallback, useEffect, useState } from "react";
import { getValidationErrors } from "../../../../core/utils/validation";
import Button from "../../../Design/Button";
import Input from "../../../Design/Input";
import * as yup from 'yup';

const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
});

const defaultData = {
    firstName: '',
    lastName: '',
}

const DirectorForm = ({onSubmit, initialData={}, disabled}) => {

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
                label="First name"
                type="text"
                name="firstName"
                value={data.firstName}
                disabled={disabled}
                onChange={handleChange}
                error={errors.firstName}
            />

            <Input
                label="Last name"
                type="text"
                name="lastName"
                value={data.lastName}
                disabled={disabled}
                onChange={handleChange}
                error={errors.lastName}
            />

            <Button className='mt-4' type="submit" disabled={disabled}>
                {data._id ? 'Update' : 'Create'}
            </Button>

        </form>
    )

}

export default DirectorForm;