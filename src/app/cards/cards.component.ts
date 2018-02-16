import {Component, Input} from '@angular/core';
import {CardService} from './cards.service';

@Component({
    selector: 'card',
    templateUrl: './cards.component.html'
})
export class CardComponent {
    @Input() card: any[];

    constructor(private cardService: CardService) {}
}
