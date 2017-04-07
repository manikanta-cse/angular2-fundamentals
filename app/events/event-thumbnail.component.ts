import {Component,Input,Output,EventEmitter} from '@angular/core'

@Component({
    selector:'event-thumbnail',
    template:`
     <div [routerLink]="['/events',event.id]" class="well hoverwell thumbnail">
                 <h2>{{event?.name}}</h2>
                 <div>Date: {{event?.date}} </div>
                 <div [ngClass]="getStartTimeClass()" [ngStyle]="getStartTimeStyle()" [ngSwitch]="event?.time">
                 Time: {{event?.time}} 
                 <span *ngSwitchCase="'8:00 am'">(Early Start) </span>
                  <span *ngSwitchCase="'10:00 am'">(Late Start) </span>
                 <span *ngSwitchDefault>(Normal Start) </span>
                 </div>
                 <div>Price: \${{event?.price}} </div>     
                 <div *ngIf="event?.location">
                  <span>Location: {{event?.location?.address}}</span>
                  </div>
                  <div *ngIf="event?.onlineUrl">
                  Online URL: {{ event?.onlineUrl }}
                  </div>
            </div>
    `,
    styles:[`.well div{ color:#bbb; } 
            .thumbnail{ min-height:210px; } 
            .pad-left{ margin-left:10px;}
            .green { color:#003300 !important; }
            .bold { font-weight:bold;}`
            ]
    //<button class="btn btn-primary" (click)="handleClickMe()"> Click Me! </button>
})

export class EventThumbnailComponent{
   // someProp:any='temp';
   @Input() event:any
  // @Output() eventClick= new EventEmitter();

//    handleClickMe(){
//       // console.log('clicked me')
//       this.eventClick.emit(this.event.name);
//    }

// logFoo(){
//     console.log('foo')
// }

getStartTimeClass(){

    // you can return arrays, objects ,string of class to ngClass
    //object
    // const isEarlyStart = this.event && this.event.time === '8:00 am'
    // return { green : isEarlyStart,bold: isEarlyStart}
    //string
    // if(this.event && this.event.time === '8:00 am')
    // return 'green bold'
    //array
    if(this.event && this.event.time === '8:00 am')
    return ['green', 'bold']
    return []
}

getStartTimeStyle():any{

    if(this.event && this.event.time === '8:00 am')
    return { color : '#003300','font-weight':'bold'}
    
   return {};
}

}


//? in event binding handles null or undefined values also called safe nnavigation operator
////   <div [hidden]="!event?.location"> used to hide elements in dom
// *ngIf to render only when criteria satisfy