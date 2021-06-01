import React from "react";
import { ReactYupForm } from "./";
import * as yup from "yup";
export default {
  title: "ReactYupForm",
};
const person = yup
  .object({
    name: yup.string().label("名称"),
    infos: yup
      .array()
      .label("基本信息")
      .of(yup.object({ score: yup.number().label("分数").min(0).required() }))
      .required()
      .min(2),
    age: yup.number().label("年龄").min(18).required(),
  })
  .label("学生");

const persons = yup.array().label("学生们").of(person).required().min(2);


export const BaseDemo = () => {
  const [value, setValue] = React.useState([
    {
      name: "yangjun",
      age: 26,
      infos: [{ score: 120 }, { score: 11 }],
    },
  ]);
  function _change(v) {
    console.log(v);
    setValue(v);
  }
  return <ReactYupForm schema={persons} value={value} onChange={_change} />;
};
