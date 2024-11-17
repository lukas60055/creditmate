export type ServerResponseType =
  | (ServerResponseOKType & ServerResponseValidateType)
  | undefined;

export type ServerResponseOKType = {
  remainingContractValue: number;
  newInstallmentAmount: number;
};

export type ServerResponseValidateType = {
  message: string;
  details?: string[];
};
