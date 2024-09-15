const validateForm = (formValues) => {
  const errors = {};
  if (!formValues.noOfLifts || formValues.noOfLifts <= 1) {
    errors["noOfLifts"] = "No of Lifts should be above 1";
  }
  if (!formValues.noOfFloors || formValues.noOfFloors <= 1) {
    errors["noOfFloors"] = "No of Floors should be above 1";
  }
  const isFormValid = Object.keys(errors).length === 0;
  return { isFormValid, errors };
};
