import * as yup from "yup";

const isRequiredMessage = "Please fill the required fields";

export default yup.object().shape({
  firstname: yup.string().required(isRequiredMessage).max(255).min(2),
  lastname: yup.string().required().max(255).min(2),
  email: yup.string().required().email(),
  password: yup.string().required(isRequiredMessage).min(5),
});
