import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// componentes
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { HomeComponent } from './componentes/home/home.component';
import { UserEditComponent } from './componentes/user-edit/user-edit.component';
import { UsersComponent } from './componentes/users/users.component';
import { TimelineComponent } from './componentes/timeline/timeline.component';
import { ProfileComponent } from './componentes/profile/profile.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'user-edit', component: UserEditComponent},
    {path: 'gente', component: UsersComponent},
    {path: 'gente/:page', component: UsersComponent},
    {path: 'timeline', component: TimelineComponent},
    {path: 'perfil/:id', component: ProfileComponent},
    {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
