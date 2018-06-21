import {
    Component,
    ViewChild,
    ViewChildren,
    ElementRef,
    Renderer2,
    forwardRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

const noop = () => {
};

export const RATING_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StarRatingComponent),
    multi: true
};

const html = `
    <div>
        <div #starRatingContainer class="star-rating-container">
        <span class='star' #star (click)="selectStar(1)">
          <ion-icon name="ios-star"></ion-icon>
        </span>
            <span class='star' #star (click)="selectStar(2)">
          <ion-icon name="ios-star"></ion-icon>
        </span>
            <span class='star' #star (click)="selectStar(3)">
          <ion-icon name="ios-star"></ion-icon>
        </span>
            <span class='star' #star (click)="selectStar(4)">
          <ion-icon name="ios-star"></ion-icon>
        </span>
            <span class='star' #star (click)="selectStar(5)">
          <ion-icon name="ios-star"></ion-icon>
        </span>
        </div>
    </div>
`;
const css = `
   .star-rating-container {
        text-align: center;
    }

    .star ion-icon {
        font-size: 3rem;
    }

    .star.yellow ion-icon {
        color: #f0f000 !important;
    }
`;

@Component({
    selector: 'star-rating',
    template: html,
    styles: [css],
    providers: [
        RATING_CONTROL_VALUE_ACCESSOR
    ]
})
export class StarRatingComponent implements ControlValueAccessor {

    private innerValue: any = 0;

    @ViewChild('starRatingContainer') starRatingContainer: ElementRef;
    @ViewChildren('star') stars: Array<ElementRef>;

    constructor(private renderer: Renderer2, private elem: ElementRef) {
    }

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    //get accessor
    get value(): any {
        return this.innerValue;
    };

    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    resetStars(): void {
        this.stars.forEach(item => this.renderer.removeClass(item.nativeElement, 'yellow'));
    }

    selectStar(rating) {
        this.resetStars();

        this.stars.forEach((item, index) => {
            if (index < rating) {
                this.renderer.addClass(item.nativeElement, 'yellow');
            }
        });

        this.value = rating;
    }

}
