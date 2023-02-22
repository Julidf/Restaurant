import * as yup from "yup";

export default yup.object().shape({
  firstname: yup.string().max(255).min(5),
  lastname: yup.string().max(255).min(5),
  email: yup.string().email(),
  password: yup.string().min(5),
});