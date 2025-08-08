import * as React from "react";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

interface BaseFormField {
  id?: string;
  label: string;
  description?: string;
  error?: string;
  containerClassName?: string;
  required?: boolean;
  className?: string;
  "data-testid"?: string;
}

interface FormFieldProps extends Omit<InputProps, 'id' | 'className'>, BaseFormField {
  as?: 'input';
}

interface FormTextareaProps extends Omit<TextareaProps, 'id' | 'className'>, BaseFormField {
  as: 'textarea';
}

type FormFieldComponent = React.ForwardRefExoticComponent<
  FormFieldProps & React.RefAttributes<HTMLInputElement>
> & {
  Textarea: React.ForwardRefExoticComponent<
    FormTextareaProps & React.RefAttributes<HTMLTextAreaElement>
  >;
};

type FormFieldUnion = FormFieldProps | FormTextareaProps;

const FormField = React.forwardRef<HTMLInputElement, FormFieldUnion>(
  ({
    as: Component = 'input',
    id,
    label,
    description,
    error,
    className,
    containerClassName,
    required,
    'data-testid': dataTestId,
    ...props
  }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const descriptionId = `${inputId}-description`;

    const commonProps = {
      id: inputId,
      'aria-invalid': !!error,
      'aria-describedby': `${description ? descriptionId : ''} ${
        error ? errorId : ''
      }`.trim(),
      className: cn(
        error && 'border-destructive focus-visible:ring-destructive/50',
        className
      ),
      'data-testid': dataTestId,
      required,
      ...props,
    };

    return (
      <div className={cn('space-y-2', containerClassName)}>
        <div className="flex items-center justify-between">
          <Label htmlFor={inputId} className={error ? 'text-destructive' : ''}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
          {error && (
            <span id={errorId} className="text-sm text-destructive">
              {error}
            </span>
          )}
        </div>
        {description && (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
        {Component === 'textarea' ? (
          <Textarea
            ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
            {...(commonProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <Input
            ref={ref as React.ForwardedRef<HTMLInputElement>}
            {...(commonProps as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </div>
    );
  }
) as FormFieldComponent;

FormField.displayName = "FormField";

export { FormField };
