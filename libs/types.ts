export type oneState = {
    key:string
    value: string
}

export type cityAPIResponse = {
    iso_a2: string;
    key: string;
    state_code: string;
    state_hasc: string;
    timezone: string;
    value: string;
}

export type items = {
    name: string;
    quantity: number;
    price: number;
  }
  
  export type FormData  = {
    street: string;
    city: string;
    state: string;
    postCode: string;
    toStreet: string;
    toCity: string;
    toState: string;
    toPostCode: string;
    description: string;
    issueDate: Date;
    toName: string;
    toEmail: string;
    items: items[];
  };