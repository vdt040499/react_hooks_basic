import React from 'react';
import PropTypes from 'prop-types';

Hero.propTypes = {
    name: PropTypes.string,
};

Hero.defaultProps = {
    name: '',
}

function Hero(props) {

    const { name } = props;

    console.log("Hero's name: ", name);

    return (
        <div>
            <p>Hero's name: {name}</p>
        </div>
    );
}

export default React.memo(Hero);