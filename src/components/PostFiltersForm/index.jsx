import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRef } from 'react';

PostFiltersForm.propTypes = {
    onSubmit: PropTypes.func,
};

PostFiltersForm.defaultProps = {
    onSubmit: null,
}

function PostFiltersForm(props) {

    const { onSubmit } = props;
    const [ searchForm, setSearchForm ] = useState('');
    const typingTimeoutRef = useRef(null); // useRef giúp biến không thay đổi giữa những lần render

    function handleSearchTermChange(e) {
        const value = e.target.value;
        setSearchForm(value);

        if (!onSubmit) return;


        //Debounce
        //SET == 100 -- CLEAR, SET == 100 --> SUBMIT
        //SET == 300 --> SUBMIT
        if(typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            const formValue = {
                searchTerm: value
            }   
            onSubmit(formValue);
        }, 300);
    }

    return (
        <form>
            <input 
                type="text"
                value={searchForm}
                onChange={handleSearchTermChange}
            />
        </form>
    );
}

export default PostFiltersForm;