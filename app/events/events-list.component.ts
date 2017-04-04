import {Component} from '@angular/core'

@Component({
    selector:'events-list',
    template:`
      <div>
            <h1>Upcoming Angular 2 Events </h1>
            <hr>
           
           <event-thumbnail #thumbnail [event]="event1"></event-thumbnail>
           
        </div>
    
    `
    // (eventClick)="handleEventClicked($event)"
   // templateUrl:'app/events/events-list.component.html'
   //<h3>{{thumbnail.someProp}} </h3>
         //  <button class="btn btn-primary" (click)="thumbnail.logFoo()"> Click Me! </button>
    
    
})

export class EventsListComponent{
        event1={
            id:1,
            name:'Angular Connect',
            date: '9/26/2017',
            time: '10:00 am',
            price: 400,
            imageUrl:'/app/assests/images/angularconnect-shield.png',
            location:{ address:'1057 DT',city:'London',country:'England'}
        }

    // handleEventClicked(data){
    //     console.log('recieved:' ,data);
    // }


}


// ways to communicate b/w Components
// through @Input, @Output
//creating a alias name on component and use tthem to access methods and props callled template referecne variable