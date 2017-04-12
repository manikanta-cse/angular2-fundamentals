import {VoterService} from './voter.service'
import {ISession} from '../shared/event-model'

import {Observable} from 'rxjs/Rx'

describe('VoterService',()=>{
let voterSvc:VoterService,
mockHttp;

    beforeEach(()=>{
        mockHttp=jasmine.createSpyObj('mockHttp',['delete','post'])
        voterSvc= new VoterService(mockHttp);
    });

    describe('delete voter',()=>{

        it('should remove the voter from the list of voters',()=>{
            var session= {id:6,voters:["mani","teja"]}
            
            mockHttp.delete.and.returnValue(Observable.of(false));

            voterSvc.deleteVoter(3,<ISession>session,"mani");

            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe("teja");
        })

        it('should call http.delete wit hthe right url',()=>{
             var session= {id:6,voters:["mani","teja"]};

              mockHttp.delete.and.returnValue(Observable.of(false));

               voterSvc.deleteVoter(3,<ISession>session,"mani");

               expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/mani')
        })
    })

    describe('addVoter',()=>{

        it('should call http.post wit hthe right url',()=>{
             var session= {id:6,voters:["mani"]};

              mockHttp.post.and.returnValue(Observable.of(false));

               voterSvc.addVoter(3,<ISession>session,"mani");

               expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/mani',"{}",jasmine.any(Object))
        })

    })
    
    

})