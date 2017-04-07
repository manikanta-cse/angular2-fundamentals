import {Routes} from '@angular/router'

import {
      EventsListComponent,
      EventDetailsComponent,
      CreatEventComponent,
      EventRouteActivatorService,
      EventListResolver

    
} from './events/index'

import {Error404Component} from './errors/404.component'

 
export const appRoutes:Routes=[
    {path:'events/new',component:CreatEventComponent,canDeactivate:['canDeactivateCreateEvent']},
    {path:'events',component:EventsListComponent,resolve:{events:EventListResolver}},
     {path:'events/:id',component:EventDetailsComponent,canActivate:[EventRouteActivatorService]},      
     {path:'404',component:Error404Component},      
      {path:'',redirectTo:'/events',pathMatch:'full'},
      {path:'user',loadChildren:'app/user/user.module#UserModule'},      
]