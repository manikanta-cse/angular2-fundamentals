import {Injectable} from '@angular/core'
import {Http,Response,Headers,RequestOptions} from '@angular/http'
import {Observable} from 'rxjs/Rx'

import {ISession} from '../shared/event-model'

@Injectable()
export class VoterService{

    constructor(private http:Http) {
        
        
    }

    deleteVoter(eventId:number,session:ISession,voterName:string){
        session.voters= session.voters.filter(voter=>voter!==voterName);

        let url=`/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`
        this.http.delete(url).catch(this.handleError).subscribe();

    }

    addVoter(eventId:number,session:ISession,voterName:string){
        session.voters.push(voterName);

        let headers = new Headers({'Content-Type':'application/json'});
        let options= new RequestOptions({headers});

        let url=`/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`

        this.http.post(url,JSON.stringify({}),options).catch(this.handleError).subscribe();
    }

    userHasVoted(session:ISession,voterName:string){
        return session.voters.some(voter=>voter === voterName)
    }

    private handleError(error:Response){
      return Observable.throw(error.statusText);
    }
}