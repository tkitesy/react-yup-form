import * as React from "react";
import { FieldProps } from "./share";
import { YupField } from "./YupField";

export function ObjectField({
  schema,
  path,
  value,
  parentPath,
  onChange
}: FieldProps<object>) {
  const descriptor = schema.describe();
  return (
    <div>
      {descriptor.label}({path})
      <ul>
        {Object.entries(schema.fields).map(([k, sch]) => (
          <li>
            <YupField
              parentPath={[...parentPath, path]}
              path={k}
              onChange={onChange}
              value={value[k]}
              schema={sch}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
