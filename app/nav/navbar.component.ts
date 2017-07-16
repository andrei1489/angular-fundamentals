import { Component, OnInit, OnChanges } from '@angular/core'
import { AuthService } from '../user/auth.service'
import { EventService } from '../events/shared/event.service'
import { ISession,IEvent } from '../events/shared/event.model'
@Component({
    selector: 'nav-bar',
    templateUrl: 'app/nav/navbar.component.html',
    styles:[
        `
        .nav.navbar-nav { font-size: 15px;}
        #searchForm {margin-right: 100px;}
        @media (max-width: 1200px) {#searchForm {display:none}}
        li > a.active { color: #F97924; }
        `
    ]
})

export class NavBarComponent implements OnChanges,OnInit {
    searchTerm: string = "";
    foundSessions: ISession[] = [];
    events:IEvent[]=[];
    constructor(private auth:AuthService, private eventService:EventService){
        
    }
    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.updateEventMenu()
    }
    ngOnChanges(){
        this.updateEventMenu()    
    }
    searchSessions(searchTerm){
        this.eventService.searchSessions(searchTerm).subscribe(
            sessions => {
                this.foundSessions=sessions;
                
            }
        )
        
    }
    updateEventMenu(){
    this.eventService.getEvents().subscribe( (events) => {
            this.events=events
        } )
    }
}