import {Directive, ElementRef, Inject, Input, OnInit} from '@angular/core';
import {JQ_TOKEN} from './jQuery.service';

@Directive({
    selector: '[modal-trigger]',
})

export class ModalTriggerDirective implements OnInit {
    private el: HTMLElement;
    @Input('modal-trigger') modelId: string; // model id is alias name for modal-trigger

    constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $: any) {
      this.el = ref.nativeElement;
    }

    ngOnInit() {
        this.el.addEventListener('click', (e) => {
            this.$(`#${this.modelId}`).modal({});
        });

    }
}
