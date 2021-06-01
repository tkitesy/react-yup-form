import _ from "lodash";
import * as React from "react";
import { ArrayField } from "./ArrayField";
import { NumberField } from "./NumberField";
import { ObjectField } from "./ObjectField";
import { FieldProps, useReactYupContext } from "./share";
import { StringField } from "./StringField";

const YupFieldRegistry = new Map<string, any>();

YupFieldRegistry.set("number", NumberField);
YupFieldRegistry.set("object", ObjectField);
YupFieldRegistry.set("array", ArrayField);
YupFieldRegistry.set("string", StringField);

export function YupField({
  schema,
  value,
  path,
  parentPath,
}: Omit<FieldProps, "errors">) {
  const descriptor = schema.describe();
  const Comp = YupFieldRegistry.get(descriptor.type);
  const context = useReactYupContext();
  if (!Comp) {
    return null;
  }

  function _onChange(v: any) {
    context.changeValues(
      [...parentPath, path].filter((p) => p !== ""),
      v
    );
  }
  const errors = context.getErrors(
    [...parentPath, path].filter((p) => p !== "")
  );

  return (
    <Comp
      onChange={_onChange}
      value={value}
      path={path}
      parentPath={parentPath}
      schema={schema}
      errors={errors}
    />
  );
}
