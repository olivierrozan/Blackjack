import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CardComponent } from './cards/cards.component';
import { AppService } from './app.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    cards: any[];
    playerCards: any[];
    playerScore: number;
    iaCards: any[];
    iaScore: number;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
        private appService: AppService,
        private viewContainerRef: ViewContainerRef) { }

    ngOnInit() {
        console.log('Application Initialized!');

        this.cards = this.appService.initDock();

        this.deal();
    }

    deal() {
        this.playerCards = [];
        this.iaCards = [];

        let player = this.appService.dealCards(this.cards);
        this.playerCards = player.cards;
        this.cards = player.dock;

        let ia = this.appService.dealCards(this.cards);
        this.iaCards = ia.cards;
        this.cards = ia.dock;

        this.playerScore = this.appService.countScore(this.playerCards);
        this.iaScore = this.appService.countScore(this.iaCards);
    }

    addCard() {
        this.playerCards.push(this.cards.shift());
        const factory = this.componentFactoryResolver.resolveComponentFactory(CardComponent);
        const ref = this.viewContainerRef.createComponent(factory);
        this.playerScore = this.appService.countScore(this.playerCards);
        ref.changeDetectorRef.detectChanges();
    }
}
