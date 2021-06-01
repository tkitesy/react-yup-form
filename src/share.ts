import * as yup from "yup";
import * as React from "react";

export interface ReactYupFormProps<T> {
  schema: yup.SchemaOf<T>;
  value: T;
  onChange: (value: T) => void;
}

export interface FieldProps<T = any> {
  schema: yup.SchemaOf<T>;
  path: string;
  parentPath: string[];
  value: T;
  onChange: (value: T) => void;
  errors: string[];
}

export type YupFieldComponent = React.FC<FieldProps>;

export const ReactYupContext = React.createContext(null);

export function useReactYupContext() {
  return React.useContext(ReactYupContext);
}
