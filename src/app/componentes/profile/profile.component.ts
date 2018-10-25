import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Follow } from '../../models/follow';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    providers: [UserService, FollowService]
})
export class ProfileComponent implements OnInit {
    public url: string;
    public title: string;
    public identity;
    public user: User;
    public token;
    public stats;
    public status;
    public follow;

    constructor(
        private _userService: UserService,
        private _followService: FollowService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.title = 'Perfil';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.stats = this._userService.getStats();
        this.url = GLOBAL.url;
    }

    ngOnInit(): void {
        console.log('Componente Profile cargado correctamente!');
        this.loadPage();
    }

    loadPage() {
        this._route.params.subscribe(params => {
            const id = params['id'];
            console.log(id);
            this.getUser(id) ;
            this.getCounters(id);

        });
    }

    getUser(id): void {
        this._userService.getUser(id).subscribe(
            response => {
                if (response.user) {
                    this.user = response.user;
                    console.log(response);
                } else {
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
                this._router.navigate(['/perfil/', this.identity._id]);
            }
        );
    }

    getCounters(id) {
        this._userService.getCounters(id).subscribe(
            respose => {
                this.stats = respose;
                console.log(respose);
            },
            error => {
                console.log(<any>error);
                this._router.navigate(['/perfil/', this.identity._id]);
            }
        );
    }
}
