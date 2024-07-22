export interface Loan {
    idLoan?: number;
    idClient: number;
    idPeriod: number;
    idAmount: number;
    idInterest: number;
    createdAt?: string;
    Cliente?: {
        nameClient: string;
      };
    Monto?: {
        totalAmount: number;
      };
    Plazo?: {
        description: string;
      };
    Interest?: {
        interest: number;
      };
 
 
};
