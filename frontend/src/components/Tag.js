import React from 'react';
import Chip from 'material-ui/Chip';

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

const Tag = (props) => {
    return (
        <div style={styles.wrapper}>
            <Chip style={styles.chip}>
                {props.category}
            </Chip>
        </div>
    );
}

export default Tag;