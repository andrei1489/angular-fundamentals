import { Component,Input,Output,EventEmitter } from '@angular/core'

@Component({
    selector: 'event-thumbnail',
    template: `
    <div [routerLink]="['/events/',event.id]" class="well hoverwell thumbnail">
			<h2>{{event?.name | uppercase}}</h2>
			<div> Date: {{event?.date}}</div>
			<div [ngClass]='getTimeClass()' [ngSwitch] = "event?.time"> Time: {{event?.time}}
                <span *ngSwitchCase="'8:00 am'"> (Early Start)</span>
                <span *ngSwitchCase="'10:00 am'"> (Late Start)</span>
                <span *ngSwitchDefault>(Normal start)</span>
                </div>
			<div> Price: \${{event?.price}}</div>
			<div *ngIf="event?.location">
				<span> Location: {{event?.location.address}}</span>
				<span class='pad-left'>{{event?.location.city}},{{event.location.country}} </span>
		    </div>
            <div *ngIf="event?.onlineUrl">
				<span> OnlineUrl: {{event?.onlineUrl}}</span>
		    </div>
        </div>
    `,
    styles:[`
        .pad-left{ margin-left:10px; }
        .well div { color: #bbb; }
        .thumbnail { min-height: 210px;}
        .green { color: green !important;}
        .bold { font-weight: bold ;}
        `
    ]
})
export class EventThumbnailComponent {
   @Input() event:any
  
  getTimeClass(){
      if( this.event&& this.event.time=='8:00 am' ){
        return ['green','bold']
      } 
      return [];
  }
}