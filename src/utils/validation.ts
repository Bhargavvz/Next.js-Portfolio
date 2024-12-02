export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 50;
};

export const validateMessage = (message: string): boolean => {
  return message.length >= 10 && message.length <= 1000;
};

export interface ValidationError {
  field: string;
  message: string;
}

export const validateForm = (data: { 
  name: string; 
  email: string; 
  message: string; 
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!validateName(data.name)) {
    errors.push({
      field: 'name',
      message: 'Name must be between 2 and 50 characters'
    });
  }

  if (!validateEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Please enter a valid email address'
    });
  }

  if (!validateMessage(data.message)) {
    errors.push({
      field: 'message',
      message: 'Message must be between 10 and 1000 characters'
    });
  }

  return errors;
};
