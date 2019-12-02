export interface User {
  id?: number;

  firstname: string;
  lastname: string;

  address: {
    street: string;
    city: string;
  };
}
