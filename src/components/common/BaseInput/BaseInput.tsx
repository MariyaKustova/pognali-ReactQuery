import React, { ForwardedRef } from "react";
import classnames from "classnames";
import { has } from "lodash";

import { capitalizeFirstLetter } from "../../../helpers/utils";

import s from "./BaseInput.module.scss";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface BaseInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;  
  type?: string; 
  className?: string;
  onBlur?: () => void;  
  error?: any;
  invalid?: boolean;
  isDirty?: boolean;
  isTouched?: boolean;
  autoFocus?: boolean;
}

const BaseInput = React.forwardRef(
  (props: BaseInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      name,
      value,
      type,
      error,
      className,
      onBlur,
      onChange,
      invalid,
      autoFocus,
    } = props;

    return (
      <div className={classnames(s.BaseInput, className)}>
        <label>
          {name && (
            <div className={s.BaseInput__label}>
              {capitalizeFirstLetter(name)}
            </div>
          )}
          <input
            type={type || "text"}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            className={classnames(s.BaseInput__input, {
              [s.BaseInput__inputError]: invalid,
            })}
            ref={ref}
            autoFocus={autoFocus}
          />
        </label>
        {error && (
          <ErrorMessage
            message={capitalizeFirstLetter(
              has(error, "message") ? error.message : error
            )}
          />
        )}
      </div>
    );
  }
);

export default BaseInput;
