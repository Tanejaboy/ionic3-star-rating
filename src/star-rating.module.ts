import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { StarRatingComponent } from "./components/star-rating";

@NgModule({
    declarations: [
        StarRatingComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [StarRatingComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class StarRatingModule {
}
