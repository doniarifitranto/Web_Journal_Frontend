import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
    as = "input",
    type = "text", 
    className = "", 
    ...props 
}, ref) => {
    const Component = as;
    const baseClasses = `w-full border border-neutral-border rounded-xl px-4 py-3 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-colors text-text-dark placeholder:text-text-muted/60 ${className}`;

    return (
        <Component
            ref={ref}
            type={as === 'input' ? type : undefined}
            className={baseClasses}
            {...props}
        />
    );
});

Input.displayName = "Input";

export default Input;
