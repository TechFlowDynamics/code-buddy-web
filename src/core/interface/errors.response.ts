export type LoginGenericErrorResponse = {
  data: LoginGenericResponse;
};
export type LoginGenericResponse = {
  data: object | GenericVerifyResponseType | undefined;
  message: string;
  status: number;
};

export type GenericVerifyResponseType = {
  phoneNumber: string;
  countryCode: string;
  purpose: string;
};
