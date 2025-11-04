import * as React from 'react';

import {cn} from '@/lib/utils';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {PasswordInput} from './password-input';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

const FloatingInput = (
    {
        ref,
        className,
        type,
        ...props
    }: InputProps & {
        ref: React.RefObject<HTMLInputElement>;
    }
) => {
    // Kiểm tra nếu type là 'password'
    if (type === 'password') {
        return (
            <PasswordInput
                placeholder=" "
                className={cn('peer', className)}
                ref={ref}
                {...props}
            />
        );
    }

    // Nếu không phải 'password', sử dụng Input mặc định
    return (
        <Input
            placeholder=" "
            className={cn('peer', className)}
            ref={ref}
            {...props}
        />
    );
};
FloatingInput.displayName = 'FloatingInput';

const FloatingLabel = (
    {
        ref,
        className,
        ...props
    }: React.ComponentPropsWithoutRef<typeof Label> & {
        ref: React.RefObject<React.ElementRef<typeof Label>>;
    }
) => {
    return (
        <Label
            className={cn(
                'peer-focus:secondary peer-focus:dark:secondary absolute start-2 top-2 z-10 origin-left -translate-y-4 scale-75 transform bg-background px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-background peer-focus:rtl:left-auto peer-focus:rtl:translate-x-1/4',
                className,
            )}
            ref={ref}
            {...props}
        />
    );
};
FloatingLabel.displayName = 'FloatingLabel';

type FloatingLabelInputProps = InputProps & { label?: string };

const FloatingLabelInput = (
    {
        ref,
        id,
        label,
        ...props
    }: React.PropsWithoutRef<FloatingLabelInputProps> & {
        ref: React.RefObject<React.ElementRef<typeof FloatingInput>>;
    }
) => {
    return (
        <div className="relative">
            <FloatingInput ref={ref} id={id} {...props} />
            <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
        </div>
    );
};
FloatingLabelInput.displayName = 'FloatingLabelInput';

export {FloatingInput, FloatingLabel, FloatingLabelInput};
