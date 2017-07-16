import { Component, OnInit } from '@angular/core'
import { EventService } from '../shared/event.service'
import { ActivatedRoute, Params } from '@angular/router'
import { ISession, IEvent } from '../shared/index'

@Component({
    templateUrl : '/app/events/event-details/event-details.component.html',
    styles:[`
        .container { pading-left: 20px; pading-right: 20px; }
        .event-image { height:100px; }
        a { cursor: pointer }
    `]
})
export class EventDetailsComponent implements OnInit{
    event:any
    addMode:boolean
    filterBy:string = 'all'
    sortBy:string = 'votes'
    constructor(private eventService:EventService, private route:ActivatedRoute){

    }
    ngOnInit(){
        this.route.data.forEach( data => {
                this.event= data['event'];
                this.addMode=false;
        })
    }
    addSession(){
        this.addMode=true
    }
    saveNewSession(session:ISession){
        const maxId = Math.max.apply(null, this.event.sessions.map(s => s.id))
        session.id=maxId+1
        this.event.sessions.push(session)
        this.eventService.saveEvent(this.event).subscribe()
        this.addMode=false;
    }
    cancelAddSession(){
        this.addMode=false;
    }

}