import {Component, Input} from '@angular/core';

@Component({
    selector: 'iacard',
    templateUrl: './iaCards.component.html'
})
export class IaCardComponent {
    @Input() card: any[];
    @Input() play: boolean;

    constructor() {}
}
