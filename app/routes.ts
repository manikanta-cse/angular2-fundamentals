import {Routes} from '@angular/router';

import {
      CreateSessionComponent,
      CreatEventComponent,
      EventDetailsComponent,
      // EventRouteActivatorService,
      EventListResolver,
      EventResolverService,
      EventsListComponent,

} from './events/index';

import {Error404Component} from './errors/404.component';

export const appRoutes: Routes = [
    {path: 'events/new', component: CreatEventComponent, canDeactivate: ['canDeactivateCreateEvent']},
    {path: 'events', component: EventsListComponent, resolve: {events: EventListResolver}},
     {path: 'events/:id', component: EventDetailsComponent, resolve:
      {event: EventResolverService}
      }, // canActivate:[EventRouteActivatorService]},
     {path: 'events/session/new', component: CreateSessionComponent},
     {path: '404', component: Error404Component},
      {path: '', redirectTo: '/events', pathMatch: 'full'},
      {path: 'user', loadChildren: 'app/user/user.module#UserModule'},
];
