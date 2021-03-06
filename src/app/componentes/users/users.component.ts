import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { FollowService } from '../../services/follow.service';
import { Follow } from '../../models/follow';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    providers: [UserService, FollowService]
})
export class UsersComponent implements OnInit {
    public title: string;
    public identity;
    public token;
    public page;
    public next_page;
    public prev_page;
    public status: string;
    public total: number;
    public pages;
    public users: User[];
    public url: string;
    public follows;
    public followUserOver;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _followService: FollowService
    ) {
        this.title = 'Personas';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit(): void {
        console.log('users.component ha sido cargado');
        this.actualPage();
    }
    actualPage() {
        this._route.params.subscribe(params => {
            let page = +params['page'];
            if (!page) {
                page = 1;
            }
            this.page = page;
            if (!params['page']) {
                this.page = 1;
            }
            if (!this.page) {
                this.page = 1;
            } else {
                this.next_page = page + 1;
                this.prev_page = page - 1;

                if (this.prev_page <= 0) {
                    this.prev_page = 1;
                }
            }

            // devolver listado de usuarios
            this.getUsers(page);
        });
    }

    getUsers(page) {
        this._userService.getUsers(page).subscribe(
            response => {
                if (!response.users) {
                    this.status = 'error';
                } else {
                    this.total = response.total;
                    this.users = response.users;
                    this.pages = response.pages;
                    this.follows = response.users_following;
                    if (page > this.pages) {
                        this._router.navigate(['/gente', 1]);
                    }
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

    mouseEnter(user_id) {
        this.followUserOver = user_id;
    }

    mouseLeave() {
        this.followUserOver = 0;
    }

    followUser(followed) {
        const follow = new Follow('', this.identity._id, followed);
        this._followService.addFollow(this.token, follow).subscribe(
            response => {
                if (!response.follow) {
                    this.status = 'error';
                } else  {
                    this.status = 'success';
                    this.follows.push(followed);
                    this.getCounters();
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

    unFollowUser(followed) {
        this._followService.deleteFollow(this.token, followed).subscribe(
            response => {
                const search = this.follows.indexOf(followed);
                if (search !== -1) {
                    this.follows.splice(search, 1);
                    this.getCounters();
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

    getCounters() {
        this._userService.getCounters().subscribe(
            response => {
                localStorage.setItem('stats', JSON.stringify(response));
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}
