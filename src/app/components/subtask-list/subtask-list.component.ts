import { Component, EventEmitter, Input, Output, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subtask } from 'src/app/shared/models/subtask.model';

@Component({
  selector: 'app-subtask-list',
  templateUrl: './subtask-list.component.html',
  styleUrls: ['./subtask-list.component.scss']
})
export class SubtaskListComponent {

  @Input() subtasks: Subtask[] = [];
  @Output() subtasksChange = new EventEmitter<Subtask[]>();

  newSubtaskForm: FormGroup;

  @ViewChildren('newSubtaskInput') newSubtaskInputs!: QueryList<any>;

  constructor(private fb: FormBuilder) {
    this.newSubtaskForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
  }

  addSubtask() {
    if (this.newSubtaskForm.valid) {
      const newSubtask: Subtask = {
        id: Date.now(),
        name: this.newSubtaskForm.value.name,
        completed: false,
      }
      this.subtasks.push(newSubtask);
      this.subtasksChange.emit(this.subtasks);
      this.newSubtaskForm.reset();

      // Autofocus logic
      setTimeout(() => {
        const inputArray = this.newSubtaskInputs.toArray();
        inputArray[inputArray.length - 1]?.nativeElement.focus();
      }, 0);
    }
  }

  toggleCompletion(subtask: Subtask) {
    subtask.completed = !subtask.completed;
    this.subtasksChange.emit(this.subtasks);
  }

  updateSubtaskName(subtask: Subtask, newName: string) {
    subtask.name = newName;
    this.subtasksChange.emit(this.subtasks);
  }

  deleteSubtask(subtask: Subtask) {
    this.subtasks = this.subtasks.filter(st => st.id !== subtask.id);
    this.subtasksChange.emit(this.subtasks);
  }

  // Calculate the number of completed subtasks
  get completedSubtasks(): number {
    return this.subtasks.filter(st => st.completed).length;
  }

  // Calculate the completion percentage for the progress bar
  get completionPercentage(): number {
    if (this.subtasks.length === 0) return 0;
    return (this.completedSubtasks / this.subtasks.length) * 100;
  }
}
