import * as React from "react";
import { FieldProps } from "./share";
import { YupField } from "./YupField";

export function ArrayField({
  schema,
  path,
  value,
  parentPath,
  onChange,
  errors
}: FieldProps<any[]>) {
  const descriptor = schema.describe();
  const innerType = schema.innerType;
  return (
    <div>
      <label>
        {descriptor.label}
        {errors.join("")}
      </label>
      <ul>
        {value.map((v, index) => {
          return (
            <YupField
              key={index}
              value={v}
              onChange={onChange}
              schema={innerType as any}
              path={`${index}`}
              parentPath={[...parentPath, path]}
            />
          );
        })}
      </ul>
    </div>
  );
}
