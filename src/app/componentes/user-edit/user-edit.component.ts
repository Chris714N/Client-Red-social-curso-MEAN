import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';


@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    providers: [UserService, UploadService]
})
export class UserEditComponent implements OnInit {
    public title: string;
    public user: User;
    public status: string;
    public identity;
    public token;
    public viewToggle: boolean;
    public filesToUpload: Array<File>;
    public url: string;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _uploadService: UploadService
    ) {
        this.title = 'Actualizar mis datos';
        this.user = this._userService.getIdentity();
        this.identity = this.user;
        this.token = this._userService.getToken();
        this.viewToggle = true;
        this.url = GLOBAL.url;
    }

    ngOnInit() {
        console.log('user-edit.component se ha cargado');
        this.viewToggle = true;
        if (this._userService.getIdentity()) {
            this.identity = this._userService.getIdentity();
        }
        this.mostrar();
    }

    onSubmit(form) {
        // console.log(this.user);
        this._userService.updateUser(this.user).subscribe(
            response => {
                if (!response.user._id) {
                    this.status = 'error';
                } else {
                    this.status = 'success';
                    // console.log(this.user);
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    this.identity = localStorage.getItem('identity');

                    // Subir Imagen de Usuario
                    // tslint:disable-next-line:max-line-length
                    this._uploadService.makeFileRequest( this.url + 'upload-image-user/' + this.user._id, [], this.filesToUpload, this.token, 'image')
                                        .then((result: any) => {
                                            console.log(result);
                                            this.user.image = result.user.image;
                                            localStorage.setItem('identity', JSON.stringify(this.user));
                                        });
                }
            },
            error => {
                const errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                    console.log(errorMessage);
                    this.status = 'error';
                }
            }
        );
    }

    mostrar() {
        this.user = this._userService.getIdentity();
        this.identity = this.user;
        this.viewToggle = !this.viewToggle;
        // console.log(this.viewToggle);
        if (!this.viewToggle) {
            document.getElementById('name').setAttribute('readonly', 'true' );
            document.getElementById('surname').setAttribute('readonly', 'true' );
            document.getElementById('nick').setAttribute('readonly', 'true' );
            document.getElementById('email').setAttribute('readonly', 'true' );

        } else {
            document.getElementById('name').removeAttribute('readonly');
            document.getElementById('surname').removeAttribute('readonly');
            document.getElementById('nick').removeAttribute('readonly');
            document.getElementById('email').removeAttribute('readonly');

        }
    }


    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
}
