import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [UserService]
})
export class LoginComponent implements OnInit {
    public title: string;
    public user: User;
    public status: String;
    public identity;
    public token;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {
        this.title = 'Identificate';
        this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
    }

    ngOnInit() {
        console.log('Componente de login Cargado');
        if (this._userService.getIdentity()) {
            this.identity = this._userService.getIdentity();
            if (this.identity._id != null) {
                this._router.navigate(['/']);
            }
        }
    }
    onSubmit(form) {
        // console.log(this.user);
        // Login de usuario y conseguir sus datos
        this._userService.signup(this.user).subscribe(
            response => {
                // console.log(this.user);
                this.identity = response.user;
                // console.log(this.identity);
                if (!this.identity && !this.user._id) {
                    this.status = 'error';
                } else {
                    // persistir datos del usuario
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                    // conseguir token
                    console.log(this.identity);
                    this.getToken();
                    form.reset();
                    this.topFunction();
                }
            },
            error => {
                const errorMessage = <any>error;
                if (errorMessage != null) {
                    console.log(errorMessage);
                    this.status = 'error';
                }
            }

        );
    }

    getToken() {
        this._userService.signup(this.user, 'true').subscribe(
            response => {
                this.token = response.token;
                if (this.token.length <= 0) {
                    this.status = 'error';
                } else {
                    console.log(this.token);
                    // persistir token del usuario
                    localStorage.setItem('token', JSON.stringify(this.token));

                    // conseguir contadores y estadisticas
                    this.getCounters();
                }
            },
            error => {
                const errorMessage = <any>error;
                if (errorMessage != null) {
                    console.log(errorMessage);
                    this.status = 'error';
                }
            }

        );
    }

    topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    getCounters() {
        this._userService.getCounters().subscribe(
            response => {
                localStorage.setItem('stats', JSON.stringify(response));
                this.status = 'success';
                this._router.navigate(['/']);
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}
