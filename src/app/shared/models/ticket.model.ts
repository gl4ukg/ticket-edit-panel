/**
 * Ticket represents a task or issue with associated details such as status, assignee,
 * co-owner, importance, customer information, invoice, and a list of subtasks.
 */
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
