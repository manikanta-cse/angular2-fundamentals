import {Component, Input, OnChanges} from '@angular/core';

import {AuthService} from '../../user/auth.service';
import {ISession} from '../shared/index';
import {VoterService} from './voter.service';

@Component({
    moduleId: module.id,
    selector: 'session-list',
    templateUrl: 'session-list.component.html',

})

export class SessionListComponent implements OnChanges {
    @Input() sessions: ISession[];
    @Input() filterBy: string;
    @Input() sortBy: string;
    @Input() eventId: number;
    visibleSessions: ISession[]= [];

    constructor(private authSvc: AuthService, private voterSvc: VoterService) {

    }

    ngOnChanges() {
        if (this.sessions) {
            this.filterSessions(this.filterBy);
            this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc)
                                  : this.visibleSessions.sort(sortByVotesDesc);
        }
    }

    toggleVote(session: ISession) {
        if (this.userHasVoted(session)) {
            this.voterSvc.deleteVoter(this.eventId, session, this.authSvc.currentUser.userName);
        } else {
            this.voterSvc.addVoter(this.eventId, session, this.authSvc.currentUser.userName);
        }
        if (this.sortBy === 'votes') {
            this.visibleSessions.sort(sortByVotesDesc);
        }
    }

    userHasVoted(session: ISession) {
        return this.voterSvc.userHasVoted(session, this.authSvc.currentUser.userName);
    }

    filterSessions(filter: string) {
        if (filter === 'all') {
            this.visibleSessions = this.sessions.slice(0);
        } else {
            this.visibleSessions = this.sessions.filter((s) => {
                 return s.level.toLocaleLowerCase() === filter;
                 });

        }
    }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
    if (s1.name > s2.name) {
        return 1;
    } else if (s1.name === s2.name) {
    return 0;
}  else {
    return -1;
}
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
   return s2.voters.length -  s1.voters.length;
}
