// TextInputField.tsx
import React, {useEffect, useRef, useState} from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input"; // Đảm bảo đúng đường dẫn
import {Control, FieldPath, FieldValues} from "react-hook-form";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {cn, formatCurrency} from "@/lib/utils";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle} from "@/components/ui/dialog";
import {useRouter} from "next/navigation";

interface FormInputProps<TFieldValues extends FieldValues> {
    label: string;
    name: FieldPath<TFieldValues>;
    placeholder?: string;
    description?: string;
    control: Control<TFieldValues>;
    className?: string;
    disabled?: boolean;
}

export const FormInput = <TFieldValues extends FieldValues>({
                                                                label,
                                                                name,
                                                                placeholder = '',
                                                                description,
                                                                control,
                                                                className = '',
                                                                disabled = false,
                                                            }: FormInputProps<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input disabled={disabled} placeholder={placeholder} {...field} className={className}/>
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};


export const FormInputTextArea = <TFieldValues extends FieldValues>({
                                                                        label,
                                                                        name,
                                                                        placeholder = '',
                                                                        description,
                                                                        control,
                                                                        className = '',
                                                                    }: FormInputProps<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea
                            {...field}
                            placeholder={placeholder}
                            className={className}
                        />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};


interface FormSelectEnumProps<TFieldValues extends FieldValues> {
    label: string;
    name: FieldPath<TFieldValues>;
    description?: string;
    control: Control<TFieldValues>;
    enumOptions: { label: string; value: number | string }[]; // Các tùy chọn enum
    placeholder?: string;
    disabled?: boolean;
}

export const FormSelectEnum = <TFieldValues extends FieldValues>({
                                                                     label,
                                                                     name,
                                                                     description,
                                                                     control,
                                                                     enumOptions,
                                                                     placeholder = "Select an option",
                                                                     disabled = false
                                                                 }: FormSelectEnumProps<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Select
                            onValueChange={(value) => {
                                field.onChange(Number(value));
                            }}
                            value={field.value?.toString()}
                            disabled={disabled}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder}/>
                            </SelectTrigger>
                            <SelectContent>
                                {enumOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value.toString()}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};


export const FormInputNumber = <TFieldValues extends FieldValues>({
                                                                      label,
                                                                      name,
                                                                      placeholder = '',
                                                                      description,
                                                                      control,
                                                                      className = ''
                                                                  }: FormInputProps<TFieldValues>) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            ref={inputRef}
                            placeholder={placeholder}
                            type="text"
                            className={className}
                            min="0"
                            value={
                                field.value !== undefined
                                    ? formatCurrency(field.value)
                                    : ""
                            }
                            onChange={(e) => {
                                const rawValue = e.target.value.replace(/[^0-9]/g, "");
                                const parsedValue = parseFloat(rawValue) || 0;

                                // Update the field value
                                field.onChange(parsedValue);

                                // Preserve cursor position
                                if (inputRef.current) {
                                    const cursorPosition = e.target.selectionStart || 0;
                                    setTimeout(() => {
                                        inputRef.current?.setSelectionRange(
                                            cursorPosition,
                                            cursorPosition
                                        );
                                    }, 0);
                                }
                            }}
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};


interface FormSelectObjectProps<TFieldValues extends FieldValues> {
    label: string;
    name: FieldPath<TFieldValues>;
    description?: string;
    control: Control<TFieldValues>;
    options: any[];
    selectValue: string;
    selectLabel: string;
    placeholder?: string;
}

export const FormSelectObject = <TFieldValues extends FieldValues>({
                                                                       label,
                                                                       name,
                                                                       description,
                                                                       control,
                                                                       options,
                                                                       selectLabel,
                                                                       selectValue,
                                                                       placeholder = "Select an option",
                                                                   }: FormSelectObjectProps<TFieldValues>) => {
    return (

        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Select
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value ?? undefined}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder}/>
                            </SelectTrigger>
                            <SelectContent>
                                {options.map((option) => (
                                    <SelectItem key={option[selectValue]} value={option[selectValue]}>
                                        {option[selectLabel]}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};


export const FormInputDate = <TFieldValues extends FieldValues>({
                                                                    label,
                                                                    name,
                                                                    control,
                                                                    disabled = false,
                                                                }: FormInputProps<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => {
                return (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        disabled={disabled}
                                        variant={"outline"}
                                        className={cn(
                                            "w-full flex flex-row justify-between pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >

                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>{format(new Date(), "PPP")}</span>
                                        )}
                                        <CalendarIcon className="mr-2 h-4 w-4"/>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={field.value || new Date()}
                                        onSelect={field.onChange}
                                        initialFocus
                                        disabled={disabled}
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )
            }}
        />
    );
};


interface ConfirmationDialogProps {
    isOpen: boolean;
    onConfirm: () => void;
    onClose: () => void;
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
    redirectUrl?: string;
}

const ConfirmationDialog = ({
                                isOpen,
                                onConfirm,
                                title,
                                onClose,
                                description,
                                confirmText,
                                cancelText,
                                redirectUrl,
                            }: ConfirmationDialogProps) => {
    const router = useRouter();

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open}>
            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={onClose} variant="secondary">
                            {cancelText}
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={() => {
                            onConfirm();
                        }}
                    >
                        {confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationDialog;
