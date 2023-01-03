import * as yup from "yup";

const isRequiredMessage = "Please fill the required fields";

export default yup.object().shape({
  name: yup.string().required(isRequiredMessage).max(30),
  description: yup.string().optional().max(80),
  price: yup.number().required(isRequiredMessage).min(0),
  stock: yup.number().required(isRequiredMessage).min(0),
});
