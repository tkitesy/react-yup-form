import * as React from "react";
import * as yup from "yup";

interface ReactYupFormProps<T> {
  schema: yup.SchemaOf<T>;
  values: T;
  onSubmit: (values: T) => void;
}

interface FieldProps<T = any> {
  schema: yup.SchemaOf<T>;
  path: string;
  parentPath: string[];
}

function StringField({ schema, path }: FieldProps<string>) {
  const descriptor = schema.describe();
  return (
    <div>
      <label>
        {descriptor.label}({path})
      </label>
      <input />
    </div>
  );
}

function NumberField({ schema, path }: FieldProps<number>) {
  const descriptor = schema.describe();
  return (
    <div>
      <label>
        {descriptor.label}({path})
      </label>
      <input />
    </div>
  );
}

function ObjectField({ schema, path, parentPath }: FieldProps<object>) {
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
              schema={sch}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArrayField({ schema, path }: FieldProps<any[]>) {
  return <div>ArrayField</div>;
}

function YupField({ schema, path, parentPath }: FieldProps) {
  const descriptor = schema.describe();
  switch (descriptor.type) {
    case "string":
      return (
        <StringField
          path={path}
          parentPath={parentPath}
          schema={schema as any}
        />
      );
    case "object":
      return (
        <ObjectField
          path={path}
          parentPath={parentPath}
          schema={schema as any}
        />
      );
    case "number":
      return (
        <NumberField
          path={path}
          parentPath={parentPath}
          schema={schema as any}
        />
      );
  }
  return null;
}

export function ReactYupForm<T = any>({ schema }: ReactYupFormProps<T>) {
  return <YupField schema={schema} path="" parentPath={[]} />;
}
