export class Validation {
  static isValidEmail = (value: string): boolean => {
    const regex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,}$/gm;
    return regex.test(value);
  }

  static isRequired = (value: string): boolean => {
    return value.trim().length > 0;
  }
}
