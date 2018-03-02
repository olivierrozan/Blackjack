import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { CardComponent } from './cards/cards.component';
import { IaCardComponent } from './iaCards/iaCards.component';
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
    diffMoney: number;
    message: string;
    enableSplit: boolean;

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
        this.enableSplit = false;
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

        this.enableSplit = this.playerCards[0].label === this.playerCards[1].label;

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
     * addIaCard
     * Adds a card to dealer
     */
    addIaCard() {
        // Gives a card to player and counts the score
        this.iaCards.push(this.cards.shift());
        this.iaScore = this.appService.countScore(this.iaCards);

        // Finishes the game if score is greater than 21
        // if (this.iaScore >= 21 && this.iaCards.length === 2) {
        //     this.stand();
        // }

        // Re-init dock if empty
        if (this.cards.length < 4) {
            this.cards = this.appService.initDock();
        }

        // Creates <card> component: 1 per card
        const factory = this.componentFactoryResolver.resolveComponentFactory(IaCardComponent);
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

            while (this.iaScore <= 17 && this.playerScore < 21) {
                this.addIaCard();
            }

            let app = this.appService.checkWinner(this.playerScore, this.iaScore, this.playerBet);
            this.message = app.message;
            this.money += app.money;
            this.diffMoney = app.diffMoney;
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

        if (this.iaCards[0].label === 'A') {
            $('#myModal').modal({
                backdrop: false
            });
        }

        let app = this.appService.blackjack(this.playerScore, this.iaScore, this.playerBet);
        this.play = app.play;
        this.message = app.message;
        this.money += app.money;
        this.diffMoney = app.diffMoney;
    }

    /**
     * resetBet
     * Resets the bet
     */
    resetBet() {
        this.playerBet = 0;
    }

    /**
     * double
     * Doubles the bet
     */
    double() {

        let value = this.playerBet * 2;

        if (value <= this.money) {
            console.log(this.playerBet);
            this.addCard();
            this.stand();
            this.money -= this.playerBet;
            this.playerBet *= 2;
            console.log(this.playerBet);

            let app = this.appService.checkWinner(this.playerScore, this.iaScore, this.playerBet);
            this.message = app.message;
            this.money += app.money;
            this.diffMoney = app.diffMoney;
        }
    }

    /**
     * split
     * Splits the deck when cards are equals
     */
    split() {

    }

    /**
     * insurance
     */
    insurance(acceptInsurance: boolean) {
        /*
        if 1st ia card is A:
        prompt: do you want insurance?
        yes -> playerbet *= 1.5;
        if 2nd card is neither 10 nor figure: win
        else: stand()
        */

        if (acceptInsurance) {
            this.playerBet *= 1.5;
            this.money -= this.playerBet;
            this.play = 2;

            if (this.iaScore === 21) {
                this.diffMoney = 2 * this.playerBet;
                this.money += this.diffMoney;
                this.message = 'You Win!';
            } else {
                this.message = 'You Lose!';
            }

        } else {
            $('#myModal').modal('hide');
        }
    }
}
