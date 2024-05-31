import React, { forwardRef } from "react";
import styles from "./Input.module.css";
import cn from "classnames";
import { InputProps } from "./Input.props";

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { isValid = true, icon, className, ...props },
  ref
) {
  return (
    <div className={cn(styles.inputWrapper, className)}>
      <input
        ref={ref}
        className={cn(styles.input, {
          [styles.invalid]: !isValid,
        })}
        {...props}
      />
      {icon && <img src={icon} className={styles.icon} alt="icon" />}
    </div>
  );
});

export default Input;
