import { Subtask } from './subtask.model';

export interface Ticket {
  status: string;
  assignee: string;
  coOwner: string;
  importance: string;
  customerName: string;
  invoiceId: string;
  subtasks: Subtask[];
}
