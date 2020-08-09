import validatorAbc from 'validator';

type isLengthArgs = { value: string; min?: number; max?: number };

interface Validator {
  isEmail(email: string): boolean;
  isLength(args: isLengthArgs): boolean;
}

export const validator: Validator = {
  isEmail(email: string) {
    return validatorAbc.isEmail(email);
  },
  isLength({ value, min, max }: isLengthArgs) {
    return validatorAbc.isLength(value, { min, max });
  },
};
