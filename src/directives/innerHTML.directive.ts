import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[innerHTML]' })

export class InnerHTML {

	@Input() set innerHTML(html) {
		if(html != null) {
			this.el.nativeElement.innerHTML = html;
		}
	};
    constructor(private el: ElementRef) {
    }
}