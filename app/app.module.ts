import {NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'

import {
        EventsListComponent,
        EventDetailsComponent,
        EventListResolver,
        CreatEventComponent,
        EventRouteActivatorService,
        EventService,
        EventThumbnailComponent,
        CreateSessionComponent

} from './events/index'

import {EventsAppComponent} from './events-app.component';
import {NavBarComponent} from './nav/navbar.component';
import {Error404Component} from './errors/404.component';
import {ToastrService} from './common/toastr.service';
import {AuthService} from './user/auth.service';
import {appRoutes} from './routes'

@NgModule({
    imports:[
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)
        ],
    declarations:[
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        NavBarComponent,
        EventDetailsComponent,
        CreatEventComponent,
        Error404Component,
        CreateSessionComponent
  ],
    bootstrap:[EventsAppComponent],
    providers:[
        EventService,
        ToastrService,
        EventRouteActivatorService,
        EventListResolver,
        AuthService,
        {
            provide:'canDeactivateCreateEvent',
            useValue:checkDirtyState
        }
        ]
})

export class AppModule{



}

function checkDirtyState(component:CreatEventComponent){

    if(component.isDirty)
        return window.confirm('you have not saved the event,waana cancel it?')
    return true;
}