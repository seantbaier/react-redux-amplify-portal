import * as Yup from "yup";

export default Yup.object().shape({
  password: Yup.string().min(8).required("Please provide an new password"),
  confirmPassword: Yup.string().min(8).required("Please confirm password"),
});
