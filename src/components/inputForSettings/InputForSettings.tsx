import { forwardRef } from "react";
import style from "./InputForSettings.module.css";
import cn from "classnames";
import { InputForSettingsProps } from "./InputForSettings.props";

const InputForSettings = forwardRef<HTMLInputElement, InputForSettingsProps>(function Input(
  { title, isValid = true, className, ...props },
  ref
) {
  return (
    <div className={cn(style.inputWrapper)}>
        <p>{title}</p>
      <input
        ref={ref}
        className={cn(style.input, {
          [style.invalid]: !isValid,
        }, className)}
        {...props}
      />
    </div>
  );
});

export default InputForSettings;
