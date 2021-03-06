import {ISession} from '../shared/event-model';
import {VoterService} from './voter.service';

import {Observable} from 'rxjs/Observable';

describe('VoterService', () => {
let voterSvc: VoterService,
mockHttp;

beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
        voterSvc = new VoterService(mockHttp);
    });

describe('delete voter', () => {

        it('should remove the voter from the list of voters', () => {
            const session = {id: 6, voters: ['mani', 'teja']};

            mockHttp.delete.and.returnValue(Observable.of(false));

            voterSvc.deleteVoter(3, session as ISession, 'mani');

            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe('teja');
        });

        it('should call http.delete wit hthe right url', () => {
             const session = {id: 6, voters: ['mani', 'teja']};

             mockHttp.delete.and.returnValue(Observable.of(false));

             voterSvc.deleteVoter(3, session as ISession, 'mani');

             expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/mani');
        });
    });

describe('addVoter', () => {

        it('should call http.post wit hthe right url', () => {
             const session = {id: 6, voters: ['mani']};

             mockHttp.post.and.returnValue(Observable.of(false));

             voterSvc.addVoter(3, session as ISession, 'mani');

             expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/mani', '{}', jasmine.any(Object));
        });

    });

});
