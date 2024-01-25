
// custom regex validator for the express-validator
export const customRegexValidator = (value, regexPattern, errorMsg) => {
    const regex = new RegExp(regexPattern);
    if (!regex?.test(value)) {
      throw new Error(errorMsg);
    }
    return true;
  };