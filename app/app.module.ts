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
        CreateSessionComponent,
        SessionListComponent,
        DurationPipe

} from './events/index'

import {EventsAppComponent} from './events-app.component';
import {NavBarComponent} from './nav/navbar.component';
import {Error404Component} from './errors/404.component';
import {TOASTR_TOKEN,Toastr} from './common/toastr.service';
import {CollapsibleWellComponent} from './common/collapsible-well.component';
import {AuthService} from './user/auth.service';
import {appRoutes} from './routes'

declare let toastr:Toastr // to compiler that we know that obj 

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
        CreateSessionComponent,
        SessionListComponent,
        CollapsibleWellComponent,
        DurationPipe 
  ],
    bootstrap:[EventsAppComponent],
    providers:[                    // there are two more ways to DI is useExisting,useFactory
        EventService,  
        {                          //other way to declaree DI registry
            provide:TOASTR_TOKEN,
            useValue:toastr
        },
        EventRouteActivatorService, //short hand way to declaree DI registry
        {                              //other way to declaree DI registry when type is class
            provide:EventListResolver,  
            useClass :EventListResolver
        },
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