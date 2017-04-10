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
        DurationPipe,
        UpvoteComponent,
        VoterService,
        LocationValidatorDirective

} from './events/index'

import {
        TOASTR_TOKEN,
        Toastr,
        JQ_TOKEN,
        CollapsibleWellComponent,
        SimpleModalComponent,
        ModalTriggerDirective
} from './common/index'

import {EventsAppComponent} from './events-app.component';
import {NavBarComponent} from './nav/navbar.component';
import {Error404Component} from './errors/404.component';
import {AuthService} from './user/auth.service';
import {appRoutes} from './routes'

declare let toastr:Toastr // to compiler that we know that obj 

declare let jQuery: Object;

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
        DurationPipe ,
        SimpleModalComponent,
        ModalTriggerDirective,
        UpvoteComponent,
        LocationValidatorDirective
        
  ],
    bootstrap:[EventsAppComponent],
    providers:[                    // there are two more ways to DI is useExisting,useFactory
        EventService,  
        {                          //other way to declaree DI registry
            provide:TOASTR_TOKEN,
            useValue:toastr
        },
        {                          //other way to declaree DI registry
            provide:JQ_TOKEN,
            useValue:jQuery
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
        },
        VoterService
        ]
})

export class AppModule{



}

function checkDirtyState(component:CreatEventComponent){

    if(component.isDirty)
        return window.confirm('you have not saved the event,waana cancel it?')
    return true;
}