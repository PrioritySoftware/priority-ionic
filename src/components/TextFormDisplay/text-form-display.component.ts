import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Form } from '../../entities/form.class';

@Component({
  selector: 'text-form-display',
  templateUrl: 'text-form-display.html',
  styleUrls: ['./text-form-display.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TextFormDisplay {

  @Input('Form') form : Form;

  constructor() { }

  getHTML()
  {
      if (this.form.rows["1"] != null)
          return this.form.rows["1"].htmltext;
      return "";
  }

}
