import { useCallback, useEffect, useState } from "react";
import { getValidationErrors } from "../../../../core/utils/validation";
import Button from "../../../Design/Button";
import Input from "../../../Design/Input";
import * as yup from 'yup';
import {format} from 'date-fns'
import DirectorSelect from "../../Directors/Select/DirectorSelect";

const schema = yup.object().shape({
    title: yup.string().required(),
    directorId: yup.string().required().nullable(),
    coverLink: yup.string().required(),
    releaseDate: yup.string().required(),
    duration: yup.number().required(),
});

const defaultData = {
    title: '',
    directorId: '',
    coverLink: '',
    releaseDate: format(new Date(), 'yyyy'),
    duration: 0,
}

const MovieForm = ({onSubmit, initialData={}, disabled}) => {

    const [isTouched, setIsTouched] = useState(false);
    const [data, setData] = useState({
        ...defaultData,
        ...initialData,
    });
    
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        
        if(e.target.localName === 'select') {

            // insanely dumb workaround to actually show the change when showed back to detailpage
            const text = e.target.[e.target.options.selectedIndex].innerHTML;
            const res = text.split(" ");
            const firstName = res.splice(0, Math.ceil(res.length / 2));
            const lastName = res.splice((Math.ceil(res.length / 2)) - 1, res.length);
            // set virtual field director to an accurate name from the selected director option.
            // virtual field only updates when fetched again.
            // this way director name is visually updated before needing to update
            setData({
                ...data,
                director: {
                    _id: e.target.value,
                    firstName: firstName[0],
                    lastName: lastName[0]
                },
                directorId: e.target.value,
            })
        } else {
            setData({
               ...data,
               [e.target.name]: e.target.value
            })
        }
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
                label="Title"
                type="text"
                name="title"
                value={data.title}
                disabled={disabled}
                onChange={handleChange}
                error={errors.title}
            />

            <DirectorSelect
                label="Director"
                name="directorId"
                value={data.directorId}
                disabled={disabled}
                onChange={handleChange}
                error={errors.directorId}
            />

            <Input
                label="Link to cover image"
                type="text"
                name="coverLink"
                value={data.coverLink}
                disabled={disabled}
                onChange={handleChange}
                error={errors.coverLink}
            />

            <Input
                label="Release year"
                type="text"
                name="releaseDate"
                value={data.releaseDate}
                disabled={disabled}
                onChange={handleChange}
                error={errors.releaseDate}
            />

            <Input
                label="Duration in minutes"
                type="number"
                name="duration"
                value={data.duration.toString()}
                disabled={disabled}
                onChange={handleChange}
                error={errors.duration}
            />

            <Button type="submit" disabled={disabled}>
                {data._id ? 'Update' : 'Create'}
            </Button>

        </form>
    )

}

export default MovieForm;