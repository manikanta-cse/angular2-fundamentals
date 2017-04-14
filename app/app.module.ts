import './rxjs-extension';

import {NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, PreloadAllModules} from '@angular/router';

import {
        CreateSessionComponent,
        CreatEventComponent,
        DurationPipe,
        EventDetailsComponent,
        // EventRouteActivatorService,
        EventListResolver,
        EventResolverService,
        EventService,
        EventsListComponent,
        EventThumbnailComponent,
        LocationValidatorDirective,
        SessionListComponent,
        UpvoteComponent,
        VoterService,

} from './events/index';

import {
        CollapsibleWellComponent,
        JQ_TOKEN,
        ModalTriggerDirective,
        SimpleModalComponent,
        Toastr,
        TOASTR_TOKEN,
} from './common/index';

import {Error404Component} from './errors/404.component';
import {EventsAppComponent} from './events-app.component';
import {NavBarComponent} from './nav/navbar.component';
import {appRoutes} from './routes';
import {AuthService} from './user/auth.service';

declare let toastr: Toastr; // to compiler that we know that obj

declare let jQuery: Object;

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules}),
        HttpModule,
        ],
    declarations: [
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
        LocationValidatorDirective,

  ],
    bootstrap: [EventsAppComponent],
    providers: [                    // there are two more ways to DI is useExisting,useFactory
        EventService,
        {                          // other way to declaree DI registry
            provide: TOASTR_TOKEN,
            useValue: toastr,
        },
        {                          // other way to declaree DI registry
            provide: JQ_TOKEN,
            useValue: jQuery,
        },
        // EventRouteActivatorService, // short hand way to declaree DI registry
        {                              // other way to declaree DI registry when type is class
            provide: EventListResolver,
            useClass : EventListResolver,
        },
        AuthService,
        {
            provide: 'canDeactivateCreateEvent',
            useValue: checkDirtyState,
        },
        VoterService,
        EventResolverService,
        ],
})

export class AppModule {

}

function checkDirtyState(component: CreatEventComponent) {

    if (component.isDirty) {
        return window.confirm('you have not saved the event,waana cancel it?');
    }
    return true;
}
