import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import Step_1 from "./StepForm/Step_1";
import Step_2 from "./StepForm/Step_2";
import Step_3 from "./StepForm/Step_3";
import Step_4 from "./StepForm/Step_4";
import Review from "./StepForm/Review";
import Submit from "./StepForm/Submit";

const defaultData = {
  gender: "men",
  name: "",
  email: "",
  nickName: "",
  Tel: "",
  Address: "",
  garment_type: "",
  garment_style: "",
  fitting: "",
  fabric: "",
  choose_style: "",
  ready_style_number: "",
};

const steps = [
  { id: "step_1" },
  { id: "step_2" },
  { id: "step_3" },
  { id: "step_4" },
  { id: "review" },
  { id: "submit" },
];

export default function MultiStepForm() {
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  });

  const props = { formData, setForm, navigation };
  switch (step.id) {
    case "step_1":
      return <Step_1 {...props} />;
    case "step_2":
      return <Step_2 {...props} />;
    case "step_3":
      return <Step_3 {...props} />;
    case "step_4":
      return <Step_4 {...props} />;
    case "review":
      return <Review {...props} />;
    case "submit":
      return <Submit {...props} />;
  }
}
