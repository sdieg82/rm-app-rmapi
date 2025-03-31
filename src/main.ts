import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent,{
  providers:[
    provideHttpClient(),//Para peticiones http en los servicioa
    provideRouter(routes, withComponentInputBinding()), //Para enlazar los componentes con las rutas
  ]
} )
  

