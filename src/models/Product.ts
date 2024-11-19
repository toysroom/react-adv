import { Status } from "./Status";

export interface Product {
    id: number;
    name: string;
    cod: string;
    price: number;
    size: string;

    destroy: Status;
}