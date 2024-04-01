import React from 'react';
import classes from './MyInput.module.css';


const MyInput = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<"input">>((props, ref) => {
    return (
        <input ref={ref} {...props} className={classes.myInput}/>
    )
})


export default MyInput;