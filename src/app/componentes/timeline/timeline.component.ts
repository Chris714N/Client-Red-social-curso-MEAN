import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, ChildActivationStart } from '@angular/router';
import { Publication } from '../../models/publication';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
import * as $ from '../../../../node_modules/jquery/jquery.js';
import { MomentModule } from 'angular2-moment';

declare var $: any;


@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    providers: [UserService, PublicationService]
})
export class TimelineComponent implements OnInit {
    public url: string;
    public title: string;
    public identity;
    public token;
    public status;
    public page;
    public total;
    public pages;
    public itemsPerPage;
    public itemsNow = 0;
    public noMore = false;
    public publications: Publication[];
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _publicationService: PublicationService
    ) {
        this.title = 'Timeline';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.page = 1;
    }

    ngOnInit() {
        console.log('Componente timeline cargado correctamente!');
        this.getPublications(this.page);
    }
    getPublications(page, adding = false) {
        this._publicationService.getPublications(this.token, page).subscribe(
            response => {
                if (response.publications) {
                    this.total = response.total_items;
                    this.pages = response.pages;
                    // this.publications = response.publications;
                    this.itemsPerPage = response.items_per_page;
                    if (!adding) {
                        this.publications = response.publications;
                    } else {
                        const arrayA = this.publications;
                        const arrayB = response.publications;
                        this.publications = arrayA.concat(arrayB);
                        this.itemsNow = response.items_per_page + this.itemsNow;
                        $('html, body').animate( {
                            scrollTop: $('#publications').prop('scrollHeight')
                        }, 500);
                    }
                } else {
                    this.status = 'error';
                }
            },
            error => {
                const errorMessage = <any>error;
                console.log(errorMessage);

                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        );
    }

    viewMore() {
        if (this.page === this.pages) {
            this.noMore = true;
        } else {
            this.page += 1;
            // console.log(this.page);
            this.getPublications(this.page, true);
        }
    }

    refresh() {
        this.page = 1;
        this.getPublications(1);
    }
}
