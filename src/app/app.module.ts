import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CardComponent } from './cards/cards.component';
import { IaCardComponent } from './iaCards/iaCards.component';
import { CardService } from './cards/cards.service';
import { AppService } from './app.service';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/main.scss';

import * as $ from 'jquery';
import { } from 'bootstrap';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        AppRoutingModule
    ],
    declarations: [AppComponent, CardComponent, IaCardComponent],
    entryComponents: [CardComponent, IaCardComponent],
    providers: [CardService, AppService],
    bootstrap: [AppComponent]
})

export class AppModule {}
