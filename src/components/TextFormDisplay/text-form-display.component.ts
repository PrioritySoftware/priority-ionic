import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'text-form-display',
  templateUrl: 'text-form-display.html',
  styleUrls: ['./text-form-display.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TextFormDisplay {

  @Input('Form') form;

  constructor() { }

  getHTML()
  {
      if (this.form.rows["1"] != null)
          return this.form.rows["1"].htmltext;
      return "";
  }

}
