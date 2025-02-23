import { Status } from "../enums/status.enum";

export interface Item {
    id: number;
    title: string;
    description: string;
    status: Status;
    creation_date: string;
    update_date: string;
  }
  