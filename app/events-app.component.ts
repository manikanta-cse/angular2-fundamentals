import {Component,OnInit} from '@angular/core'
import {AuthService} from './user/auth.service'

@Component({
    template:`
    <nav-bar>  </nav-bar>    
    <router-outlet>  </router-outlet>
    `,
    selector:'events-app'
})


export class EventsAppComponent implements OnInit{

    
    constructor(private authSvc:AuthService) {
        
        
    }

    ngOnInit(){
        this.authSvc.checkAuthenticationStatus();
    }



}