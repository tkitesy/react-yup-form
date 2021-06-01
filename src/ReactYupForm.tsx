import _ from "lodash";
import * as React from "react";
import { ValidationError } from "yup";
import { ReactYupContext, ReactYupFormProps } from "./share";
import { YupField } from "./YupField";

export function ReactYupForm<T = any>({
  schema,
  value,
  onChange,
}: ReactYupFormProps<T>) {
  const [errors, setErrors] = React.useState<ValidationError>(null);
  React.useEffect(() => {
    schema
      .validate(value, { abortEarly: false })
      .catch((e: ValidationError) => {
        setErrors(e);
      });
  }, [schema, value]);

  function changeValues(fullPath: string[], v: any) {
    onChange(_(value).set(fullPath, v).cloneDeep());
  }
  function getErrors(fullPath: string[]): string[] {
    if (fullPath.length === 0 || errors === null) {
      return [];
    }
    let name = "";
    for (let p of fullPath) {
      if (/^\d+$/.test(p)) {
        name = name + `[${p}]`;
      } else {
        name = name + "." + p;
      }
    }
    name = name.startsWith(".") ? name.slice(1) : name;
    if(name === "") {
      return errors.errors
    }
    for (let err of errors.inner) {
      if (err.path === name) {
        return err.errors;
      }
    }
    return [];
  }

  return (
    <ReactYupContext.Provider value={{ changeValues, values: value, getErrors }}>
      <YupField
        value={value}
        onChange={onChange}
        schema={schema}
        path=""
        parentPath={[]}
      />
    </ReactYupContext.Provider>
  );
}
