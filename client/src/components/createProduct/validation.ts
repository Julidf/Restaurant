import * as yup from "yup";

const isRequiredMessage = "Please fill the required fields";

export default yup.object().shape({
  name: yup.string().required(isRequiredMessage).max(30),
  description: yup.string().required().max(80),
  price: yup.number().required(isRequiredMessage).min(0.1),
  stock: yup.number().required(isRequiredMessage).min(0.1),
  image: yup.string().required(isRequiredMessage).url().min(1),
});
