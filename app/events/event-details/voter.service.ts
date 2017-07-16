import { Injectable } from '@angular/core'
import { ISession } from '../shared/event.model'
import { Observable } from 'rxjs/RX'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
@Injectable()
export class VoterService{

    constructor(private http:Http){}
    deleteVoter(eventId:number,session:ISession,username:string){
        let url=`/api/events/${eventId}/sessions/${session.id}/voters/${username}`
        this.http.delete(url).catch(this.handleError).subscribe()
        session.voters=session.voters.filter((user) => user!==username)
    }
    addVoter(eventId:number,session:ISession,username:string){
        
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions({headers:headers})
        let url=`/api/events/${eventId}/sessions/${session.id}/voters/${username}`
        this.http.post(url,JSON.stringify({}),options).catch(this.handleError).subscribe()
        session.voters.push(username)
        
    }
    userHasVoted(session:ISession,username:string){
        return session.voters.some(voter => voter === username)

    }
    private handleError(error:Response){
      return Observable.throw(error.statusText)
    }
}