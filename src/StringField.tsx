import * as React from "react";
import { FieldProps } from "./share";

export function StringField({
  schema,
  path,
  value,
  onChange,
  errors
}: FieldProps<string>) {
  const descriptor = schema.describe();
  return (
    <div>
      <label>
        {descriptor.label}
        {errors.join("")}
      </label>
      <input onChange={(e) => onChange(e.target.value)} value={value} />
    </div>
  );
}
