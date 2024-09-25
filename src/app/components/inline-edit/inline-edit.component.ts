import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.scss']
})
export class InlineEditComponent implements OnInit {
 /**
   * InlineEditComponent allows in-place editing of text with validation.
   * Emits updated value to parent when saved.
   */
  @Input() value: string = '';
  @Input() fieldName: string = '';
  @Output() valueChanged = new EventEmitter<string>();

  editMode: boolean = false;
  control: FormControl = new FormControl('', Validators.required);

  @ViewChild('inputField') inputField!: ElementRef;

  ngOnInit(): void {
    this.control.setValue(this.value);
  }

  enableEdit() {
    this.editMode = true;
    setTimeout(() => {
      this.inputField.nativeElement.focus();
    }, 0);
  }

  save() {
    if (this.control.valid) {
      this.valueChanged.emit(this.control.value);
      this.editMode = false;
    }
  }

  cancel() {
    this.control.setValue(this.value);
    this.editMode = false;
  }
  get displayValue(): string {
    return this.value ? this.value : `Enter ${this.fieldName}`;
  }
}
