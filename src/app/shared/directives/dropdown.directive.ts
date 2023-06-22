import {
  Directive,
  HostBinding,
  HostListener,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[appDropdownDirective]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  //   @HostListener('click') toggleOpen() {
  //     this.isOpen = !this.isOpen;
  //   }

  @HostListener('document:click', ['$event']) toggleOpen(eventData: Event) {
    this.isOpen = this.elRef.nativeElement.contains(eventData.target)
      ? (this.isOpen = !this.isOpen)
      : false;
  }

  constructor(private elRef: ElementRef) {}
}
