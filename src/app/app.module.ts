import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
// componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { importType } from '@angular/compiler/src/output/output_ast';
import { HomeComponent } from './componentes/home/home.component';
import { UserEditComponent } from './componentes/user-edit/user-edit.component';
import { UsersComponent } from './componentes/users/users.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { TimelineComponent } from './componentes/timeline/timeline.component';
import { PublicationsComponent } from './componentes/publications/publications.component';
import { ProfileComponent } from './componentes/profile/profile.component';

// Manejo de hora y fecha
import { MomentModule } from '../../node_modules/angular2-moment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    PublicationsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    MomentModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
