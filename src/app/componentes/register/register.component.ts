import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    providers: [UserService]
})
export class RegisterComponent implements OnInit {
    public title: string;
    public user: User;
    public status: string;
    public identity;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {
        this.title = 'Registrarte';
        this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
    }
    ngOnInit() {
        console.log('Componente de registro Cargado');
        if (this._userService.getIdentity()) {
            this.identity = this._userService.getIdentity();
            if (this.identity._id != null) {
                this._router.navigate(['/']);
            }
        }
    }
    onSubmit(form) {
        this._userService.register(this.user).subscribe(
            response => {
                if (response.user && response.user._id) {
                    console.log(response.user);
                    this.status = 'success';
                    form.reset();
                } else {
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }
    topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

}
