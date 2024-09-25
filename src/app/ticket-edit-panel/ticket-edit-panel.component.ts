import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ticket } from '../shared/models/ticket.model';
import { Subtask } from '../shared/models/subtask.model';

type EditableField = 'assignee' | 'coOwner' | 'importance' | 'customerName' | 'invoiceId';

@Component({
  selector: 'app-ticket-edit-panel',
  templateUrl: './ticket-edit-panel.component.html',
  styleUrls: ['./ticket-edit-panel.component.scss']
})
export class TicketEditPanelComponent {

  ticketForm!: FormGroup;
  currentView: 'Details' | 'Activity' | 'Comments' | 'Attachments' = 'Details';

  ticket: Ticket = {
    status: 'Unpaid',
    assignee: 'Brian Griffin',
    coOwner: 'Peter Griffin',
    importance: 'Very Urgent',
    customerName: '',
    invoiceId: 'INV-123',
    subtasks: [
      { id: 1, name: 'Send invoice to collections agency', completed: false },
      { id: 2, name: 'Write an email to them to follow up', completed: true }
    ]
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.ticketForm = this.fb.group({
      assignee: [this.ticket.assignee],
      coOwner: [this.ticket.coOwner],
      importance: [this.ticket.importance],
      customerName: [this.ticket.customerName],
      invoiceId: [this.ticket.invoiceId]
    })
  }

  updateField(field: EditableField, value: string) {
    this.ticket[field] = value;
  }

  onSubtasksChange(subtasks: Subtask[]) {
    this.ticket.subtasks = subtasks;
  }

  switchView(view: 'Details' | 'Activity' | 'Comments' | 'Attachments') {
    this.currentView = view;
  }

}
