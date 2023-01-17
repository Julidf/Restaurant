import * as yup from "yup";

const isRequiredMessage = "Please fill the required fields";

export default yup.object().shape({
  email: yup.string().required(isRequiredMessage).email(),
  password: yup.string().required(isRequiredMessage).min(5).max(25),
});
