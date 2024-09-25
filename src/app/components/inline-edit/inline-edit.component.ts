import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.scss']
})
export class InlineEditComponent implements OnInit {

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
}
