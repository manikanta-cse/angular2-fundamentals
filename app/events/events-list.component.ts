import {Component, OnInit} from '@angular/core';

import {EventService} from './shared/event.service';

// import {ToastrService} from '../common/toastr.service'

import {ActivatedRoute} from '@angular/router';

import {IEvent} from './shared/index';

@Component({
    // selector:'events-list',
    template: `
      <div>
            <h1>Upcoming Angular 2 Events </h1>
            <hr>
           <div class="row">
           <div *ngFor="let event of events" class="col-md-5">
           <event-thumbnail  #thumbnail   [event]="event"></event-thumbnail>
            </div>
            </div>
        </div>

    `,
    // (click)="handleThumbnailClick(event.name)"
    // (eventClick)="handleEventClicked($event)"
   // templateUrl:'app/events/events-list.component.html'
   // <h3>{{thumbnail.someProp}} </h3>
         //  <button class="btn btn-primary" (click)="thumbnail.logFoo()"> Click Me! </button>

})

export class EventsListComponent implements OnInit {

events: IEvent[];


constructor(private eventService: EventService, private activatedRoute: ActivatedRoute) {

}

ngOnInit() {
     // this.eventService.getEvents().subscribe(e=> { this.events=e });
     this.events = this.activatedRoute.snapshot.data['events'];
}

// handleThumbnailClick(eventName){
//  this.toastr.success(eventName)
// }

    // handleEventClicked(data){
    //     console.log('recieved:' ,data);
    // }

}

// ways to communicate b/w Components
// through @Input, @Output
// creating a alias name on component and use tthem to access methods and props callled template referecne variable
