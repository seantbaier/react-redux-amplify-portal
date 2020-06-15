import * as Yup from "yup";
import { Email } from "../../../utilities/validation/base";

export default Yup.object().shape({
  email: Email,
});
