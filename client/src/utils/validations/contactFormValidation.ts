import * as yup from "yup";

const isRequiredMessage = "Please fill the required fields";

export default yup.object().shape({
  name: yup.string().required(isRequiredMessage).max(255),
  message: yup.string().required().max(255),
  email: yup.string().required().email(),
});
