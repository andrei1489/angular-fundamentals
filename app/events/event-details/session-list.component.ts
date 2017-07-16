import { Component, Input, OnChanges } from '@angular/core'
import { ISession } from '../shared/index'
import { VoterService } from './voter.service'
import { AuthService } from '../../user/auth.service'

@Component({
    selector:'session-list',
    templateUrl: 'app/events/event-details/session-list.component.html'
})
export class SessionListComponent implements OnChanges{
    
    @Input() sessions: ISession[]
    @Input() filterBy:string
    @Input() sortBy:string
    @Input() eventId:number
    visibleSessions: ISession[] = []
    constructor(private voterService:VoterService,private authService:AuthService){}
    
    ngOnChanges() {
        if (this.sessions){
            this.filterSessions(this.filterBy)
            this.sortBy === 'name' ? this.visibleSessions.sort(SortByNameAsc) : this.visibleSessions.sort(SortByVotesDesc) 
        }
    }

    filterSessions(filter){
        if (this.filterBy==='all'){
            this.visibleSessions=this.sessions.slice(0);
        } else {
            this.visibleSessions=this.sessions.filter(session => {
                return session.level.toLocaleLowerCase() === this.filterBy
            })
        }
    }

    toggleVote(session:ISession){
        if (this.userHasVoted(session)){
            this.voterService.deleteVoter(this.eventId,session,this.authService.currentUser.userName)
        } else {
            this.voterService.addVoter(this.eventId,session,this.authService.currentUser.userName)
        }
        
        if(this.sortBy==='votes'){
            this.visibleSessions.sort(SortByVotesDesc)
        }
    }
    userHasVoted(session:ISession){
        return this.voterService.userHasVoted(session,this.authService.currentUser.userName)
    }
}

function SortByNameAsc( s1:ISession, s2:ISession){
    if (s1.name > s2.name) return 1
    if (s1.name === s2.name) return 0
    if (s1.name < s2.name) return -1
}
function SortByVotesDesc(s1:ISession,s2:ISession){
    return s2.voters.length - s1.voters.length
}