import {AfterViewInit, Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
    selector: '[PaginatorDirective]'
})
export class PaginatorDirective implements AfterViewInit {

    constructor(private Ref: ElementRef, private Renderer: Renderer2) {
    }

    ngAfterViewInit(): void {
        this.addItemsPerPageLabelAfter();
    }

    addItemsPerPageLabelAfter(): void {
        const el = this.Renderer.createElement('div', "itemsPerPageLabelAfter");
        el.textContent = "записей";
        this.Renderer.appendChild(this.Ref.nativeElement.querySelectorAll('.mat-mdc-paginator-page-size')[0], el)
    }

}
