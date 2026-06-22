import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "../../lib/utils";

type BaseFieldProps = {
  label: string;
  helper?: ReactNode;
  error?: string;
};

type InputFieldProps = BaseFieldProps &
  InputHTMLAttributes<HTMLInputElement> & {
    id: string;
  };

type TextAreaFieldProps = BaseFieldProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    id: string;
  };

const fieldClasses =
  "w-full rounded-[8px] border border-ash-100/10 bg-coal-950/60 px-3 py-3 text-sm text-ash-100 outline-none transition placeholder:text-ash-600 focus:border-ember-300/70 focus:ring-2 focus:ring-ember-300/20";

export function InputField({
  id,
  label,
  helper,
  error,
  className,
  ...props
}: InputFieldProps) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-ash-200" htmlFor={id}>
        {label}
      </label>
      <input className={cn(fieldClasses, className)} id={id} {...props} />
      {helper ? <p className="text-xs leading-5 text-ash-400">{helper}</p> : null}
      {error ? <p className="text-xs leading-5 text-wine-400">{error}</p> : null}
    </div>
  );
}

export function TextAreaField({
  id,
  label,
  helper,
  error,
  className,
  ...props
}: TextAreaFieldProps) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-ash-200" htmlFor={id}>
        {label}
      </label>
      <textarea
        className={cn(fieldClasses, "min-h-32 resize-y leading-6", className)}
        id={id}
        {...props}
      />
      {helper ? <p className="text-xs leading-5 text-ash-400">{helper}</p> : null}
      {error ? <p className="text-xs leading-5 text-wine-400">{error}</p> : null}
    </div>
  );
}
