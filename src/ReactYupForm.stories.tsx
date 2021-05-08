import React from "react";
import { ReactYupForm } from "./";
import * as yup from "yup";
export default {
  title: "ReactYupForm",
};
const person = yup.object({
  name: yup.string().label("名称"),
  age: yup.number().label("年龄"),
});

const persons = yup.array().of(person).required()

console.log(persons.spec);


export const BaseDemo = () => (
  <ReactYupForm
    schema={person}
    values={{ name: "", age: 0 }}
    onSubmit={(values) => {}}
  />
);
