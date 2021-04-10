import { useCallback, useEffect, useState } from "react";
import { getValidationErrors } from "../../../../../../core/utils/validation";
import Button from "../../../../../Design/Button";
import Input from "../../../../../Design/Input";
import * as yup from 'yup';

const schema = yup.object().shape({
    rating: yup.number().min(1).max(10).required(),
    review: yup.string(),
});

const defaultData = {
    rating: 5,
    review: '',
}

const ReviewForm = ({onSubmit, initialData={}, disabled}) => {

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
                label="Rating"
                type="number"
                name="rating"
                min='1'
                max='10'
                value={data.rating.toString()}
                disabled={disabled}
                onChange={handleChange}
                error={errors.rating}
            />

            <Input
                label="Review"
                type="text"
                name="review"
                value={data.review}
                disabled={disabled}
                onChange={handleChange}
                error={errors.review}
            />


            <Button type="submit" disabled={disabled}>
                {data._id ? 'Update' : 'Create'}
            </Button>

        </form>
    )

}

export default ReviewForm;