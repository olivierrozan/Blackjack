import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CardComponent } from './cards/cards.component';
import { AppService } from './app.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
    cards: any[];
    playerCards: any[];
    playerScore: number;
    iaCards: any[];
    iaScore: number;
    play: number;
    playerBet: number;
    money: number;
    message: string;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
        private appService: AppService,
        private viewContainerRef: ViewContainerRef) { }

    ngOnInit() {
        console.log('Application Initialized!');
        this.cards = this.appService.initDock();
        this.deal();
        this.money = 1000;
        this.message = '';
    }

    deal() {
        this.playerCards = [];
        this.iaCards = [];
        this.play = 0;
        this.playerBet = 0;
        this.message = '';

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
        this.playerScore = this.appService.countScore(this.playerCards);
        console.log('one more card for player ', this.playerScore);
        if (this.playerScore >= 21) {
            this.play = 2;
            console.log('player has played');
            this.checkWinner();
        }

        if (this.cards.length < 4) {
            this.cards = this.appService.initDock();
        }

        const factory = this.componentFactoryResolver.resolveComponentFactory(CardComponent);
        const ref = this.viewContainerRef.createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

    stand(): void {
        this.play = 2;
        this.checkWinner();
    }

    bet(bet: number): void {
        this.playerBet += bet;
        if (this.playerBet > this.money) {
            this.playerBet = this.money;
        }
    }

    startGame(): void {
        console.log('play!');
        this.play = 1;
        this.money -= this.playerBet;

        if (this.playerScore === 21 || this.iaScore === 21) {
            console.log('**BLACKJACK**');
            this.play = 2;
            this.checkWinner();
        }
    }

    resetBet() {
        this.playerBet = 0;
    }

    checkWinner() {
        if (this.playerScore > 21) {
            this.message = 'You lose!';
        } else if (this.playerScore > this.iaScore && this.playerScore <= 21) {
            this.message = 'You win!';
            this.money += (2 * this.playerBet);
        } else if (this.iaScore > this.playerScore && this.iaScore <= 21) {
            this.message = 'You lose!';
        } else if (this.iaScore === this.playerScore) {
            this.message = 'Draw!';
            this.money += this.playerBet;
        } else if (this.playerScore === 21) {
            this.money += (3 * this.playerBet);
        }
    }
}
