import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
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
        // Init deck
        this.cards = this.appService.initDock();
        this.deal();
        this.money = 1000;
        this.message = '';
    }

    /**
     * deal
     * Deals cards to player and dealer
     */
    deal() {
        this.playerCards = [];
        this.iaCards = [];
        this.play = 0;
        this.playerBet = 0;
        this.message = '';

        // Deals cards to player
        let player = this.appService.dealCards(this.cards);
        this.playerCards = player.cards;
        this.cards = player.dock;

        // Deals cards to dealer
        let ia = this.appService.dealCards(this.cards);
        this.iaCards = ia.cards;
        this.cards = ia.dock;

        // Displays player's and dealer's score
        this.playerScore = this.appService.countScore(this.playerCards);
        this.iaScore = this.appService.countScore(this.iaCards);
    }

    /**
     * addCard
     * Adds a card to player
    */
    addCard() {
        // Gives a card to player and counts the score
        this.playerCards.push(this.cards.shift());
        this.playerScore = this.appService.countScore(this.playerCards);

        // Finishes the game if score is greater than 21
        if (this.playerScore >= 21) {
            this.stand();
        }

        // Re-init dock if empty
        if (this.cards.length < 4) {
            this.cards = this.appService.initDock();
        }

        // Creates <card> component: 1 per card
        const factory = this.componentFactoryResolver.resolveComponentFactory(CardComponent);
        const ref = this.viewContainerRef.createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

    /**
     * stand
     * Player stops to play
     * Dealer plays
     * checks the winner
    */
    stand(): void {
        this.play = 2;
        this.checkWinner();
    }

    /**
     * bet
     * Displays the bet on ihm
    */
    bet(bet: number): void {
        this.playerBet += bet;
        if (this.playerBet > this.money) {
            this.playerBet = this.money;
        }
    }

    /**
     * startGame
     * Player has finished to bet
     * he can ask cards
     */
    startGame(): void {
        this.play = 1;
        this.money -= this.playerBet;

        // Checks Blakjack
        if (this.playerScore === 21 || this.iaScore === 21) {
            this.stand();

            if (this.playerScore === 21) {
                this.money += (1.5 * this.playerBet);
            }
        }
    }

    /**
     * resetBet
     * Resets the bet
     */
    resetBet() {
        this.playerBet = 0;
    }

    /**
     * checkWinner
     * Checks the winner
     */
    checkWinner() {
        // Rules
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
        }
    }
}
