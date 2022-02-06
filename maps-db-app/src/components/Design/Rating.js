import React from 'react';
import PropTypes from 'prop-types';

const Rating = React.forwardRef(
    (
        {
            label,
            name,
            onChange,
            value,
            disabled,
        },
        ref
    ) => {
        return (
            <>
                <div className="rate">
                    <input onChange={onChange} type="radio" id="star5" name={name} disabled={disabled} value="10" />
                    <label htmlFor="star5" title="text">5 stars</label>
                    <input onChange={onChange} type="radio" id="star4" name={name} disabled={disabled} value="8" />
                    <label htmlFor="star4" title="text">4 stars</label>
                    <input onChange={onChange} type="radio" id="star3" name={name} disabled={disabled} value="6" />
                    <label htmlFor="star3" title="text">3 stars</label>
                    <input onChange={onChange} type="radio" id="star2" name={name} disabled={disabled} value="4" />
                    <label htmlFor="star2" title="text">2 stars</label>
                    <input onChange={onChange} type="radio" id="star1" name={name} disabled={disabled} value="2" />
                    <label htmlFor="star1" title="text">1 star</label>
                </div>
            </>
        );
    }
);

Rating.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

export default Rating;