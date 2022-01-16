import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  HostListener,
  OnDestroy,
  Output,
} from '@angular/core';

/**
 * The view state of the element been observed.
 */
declare interface VisibilityState {
  elem: ElementRef;
  view: 'VISIBLE' | 'HIDDEN';
}

@Directive({
  selector: '[appInView]',
})
export class InViewDirective implements AfterViewInit, OnDestroy {
  /**
   * Emited each time @method _callback has been called
   */
  @Output() visibilityChange = new EventEmitter<VisibilityState>();

  /**
   * @see Documentaion https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
   */
  private _observer: IntersectionObserver;

  constructor(private _elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const options = { root: null, rootMargin: '0px', threshold: 1.0 };
    this._observer = new IntersectionObserver(this._callback, options);
    this._observer.observe(this._elementRef.nativeElement);
  }

  private _callback : IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => this.visibilityChange.emit());
  };

  ngOnDestroy(): void {
    this._observer.disconnect();
  }
}