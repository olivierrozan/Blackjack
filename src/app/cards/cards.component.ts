import {Component, AfterViewInit, Input} from '@angular/core';
import {CardService} from './cards.service';

@Component({
    selector: 'card',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.css']
})
export class CardComponent implements AfterViewInit {
    @Input() card: any[];

    constructor(private cardService: CardService) {}

    ngAfterViewInit(): void {
    }
}
