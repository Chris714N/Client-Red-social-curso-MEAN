import { Component, OnInit, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { FollowService } from '../../services/follow.service';
import { Follow } from '../../models/follow';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    providers: [UserService, PublicationService]
})
export class SidebarComponent implements OnInit, DoCheck {
    public url: string;
    public title: string;
    public identity;
    public token;
    public stats;
    public status;
    public value;
    public publication: Publication;
    // Output
    @Output() sended = new EventEmitter();
    constructor(
        private _userService: UserService,
        private _publication: PublicationService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.title = 'Sidebar';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.stats = this._userService.getStats();
        this.url = GLOBAL.url;
        this.publication = new Publication('', '', '', '', this.identity._id);
        this.value = '';
    }

    ngOnInit(): void {
        console.log('Componente sidebar cargado correctamente!');
    }
    ngDoCheck() {
        this.stats = this._userService.getStats();
    }

    onSubmit(form) {
        this._publication.addPublication(this.token, this.publication).subscribe(
            response => {
                if (response.publication) {
                    this.status = 'success';
                    this.getCounters();
                    form.reset();
                    this.value = '';
                    this._router.navigate(['/timeline']);
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

    uploadDesing() {
        this.value = document.getElementById('uploadBtn');
        this.value = this.value.files[0].name;
        console.log(this.value);
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

    sendPublication(event) {
        // console.log('evento disparado');
        this.sended.emit({send: true});
    }
}

