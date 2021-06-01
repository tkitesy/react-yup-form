import * as React from "react";
import { FieldProps } from "./share";

export function NumberField({
  schema,
  path,
  value,
  onChange,
  errors
}: FieldProps<number>) {
  const descriptor = schema.describe();
  return (
    <div>
      <label>
        {descriptor.label}({path})
        {errors.join("")}
      </label>
      <input
        onChange={(e) => onChange(parseInt(e.target.value))}
        value={value}
      />
    </div>
  );
}
