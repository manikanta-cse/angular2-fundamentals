import {Component,OnInit} from '@angular/core'

import {EventService} from './shared/event.service'

import {ToastrService} from '../common/toastr.service'

@Component({
    selector:'events-list',
    template:`
      <div>
            <h1>Upcoming Angular 2 Events </h1>
            <hr>
           <div class="row">
           <div *ngFor="let event of events" class="col-md-5">
           <event-thumbnail  #thumbnail (click)="handleThumbnailClick(event.name)"  [event]="event"></event-thumbnail>
            </div>
            </div>
        </div>
    
    `
    // (eventClick)="handleEventClicked($event)"
   // templateUrl:'app/events/events-list.component.html'
   //<h3>{{thumbnail.someProp}} </h3>
         //  <button class="btn btn-primary" (click)="thumbnail.logFoo()"> Click Me! </button>
    
    
})

export class EventsListComponent implements OnInit{

events:any[]

/**
 *
 */
constructor(private eventService:EventService,private toastr: ToastrService) {
  
}   

ngOnInit(){
    this.events = this.eventService.getEvents();
}

handleThumbnailClick(eventName){
 this.toastr.success(eventName)
}


    // handleEventClicked(data){
    //     console.log('recieved:' ,data);
    // }


}


// ways to communicate b/w Components
// through @Input, @Output
//creating a alias name on component and use tthem to access methods and props callled template referecne variable