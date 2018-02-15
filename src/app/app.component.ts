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

        for (let i = 0; i < 2; i++) {
            this.playerCards.push(this.cards.shift());
        }

        for (let i = 0; i < 2; i++) {
            this.iaCards.push(this.cards.shift());
        }

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
