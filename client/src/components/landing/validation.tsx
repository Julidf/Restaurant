import * as yup from "yup";

const isRequiredMessage = "Please fill the required fields";

export default yup.object().shape({
  username: yup.string().required(isRequiredMessage).max(255),
  password: yup.string().required(isRequiredMessage).min(6).max(25),
});
