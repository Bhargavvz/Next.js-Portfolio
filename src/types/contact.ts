export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  validationErrors: {
    [key: string]: string;
  };
}
