import { Address } from "./IAddress.Interfaces";

export interface User {
    name: string;
    email: string;
    phone: string;
    document: string;
    addresses: Address[];
    password: string;
}
