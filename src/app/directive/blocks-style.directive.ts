import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output} from '@angular/core';

@Directive({
	selector: '[appBlocksStyle]',
	host: {
		'(document:keyup)': 'initKeyUp($event)'
	},
	exportAs: 'blockStyle'
})
export class BlocksStyleDirective implements AfterViewInit {

	@Input() selector: string;
	@Input() initFirst: boolean = false;
	@Output() renderComplete = new EventEmitter();

	private items: HTMLElement[];
	private index: number = 0;
	public $event: KeyboardEvent;
	public activeElementIndex: number = 0;
	// public activeElementName: string = '';

	constructor(private el: ElementRef) {
	}

	ngAfterViewInit() {
		this.activeElementIndex = 0

		this.items = this.el.nativeElement.querySelectorAll(this.selector);

		if (this.initFirst) {
			if (this.items[0]) {
				this.items[0].classList.add('selected');
			}
		}

		setTimeout(()=>{
			this.renderComplete.emit(true);
		})
	}

	addClassSelected = (el: HTMLElement) => el.classList.add('selected');

	removeClassSelected = (el: HTMLElement) => el.classList.remove('selected');

	initKeyUp(ev: KeyboardEvent): void {

		if (ev.key === 'ArrowRight') {
			if (this.index < this.items.length -1) {
				this.removeClassSelected(this.items[this.index]);
				this.index++;
				this.addClassSelected(this.items[this.index])
			}
		}

		if (ev.key === 'ArrowLeft') {
			if (this.index > 0) {
				this.removeClassSelected(this.items[this.index]);
				this.index--;
				this.addClassSelected(this.items[this.index])
			}
		}

		this.activeElementIndex = this.index;
	}

	initStyle(index: number): void{
		if (this.items[index]) {
				this.removeClassSelected(this.items[this.index]);
				this.addClassSelected(this.items[index]);
				this.index = index;
				this.activeElementIndex = index
			}
	}


}
