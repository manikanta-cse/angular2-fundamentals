import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser'; // utility func

import {CollapsibleWellComponent} from '../../common/collapsible-well.component';
import {AuthService} from '../../user/auth.service';
import {DurationPipe} from '../shared/duration.pipe';
import {ISession} from '../shared/event-model';
import {SessionListComponent} from './session-list.component';
import {UpvoteComponent} from './upvote.component';
import {VoterService} from './voter.service';

describe('SessionListComponent', () => {

    let fixture: ComponentFixture<SessionListComponent>,
        component: SessionListComponent,
        element: HTMLElement,
        debugEl: DebugElement;

    beforeEach(async(() => {
            const mockAuthSvc = {
                isAuthenticated: () => true,
                currentUser: {userName: 'Joe'},
            };
            const mockVoterSvc = {
                userHasVoted: () => true,
            };

            TestBed.configureTestingModule({
                imports: [],
                declarations: [
                    SessionListComponent,
                    // UpvoteComponent,
                    DurationPipe,
                    // CollapsibleWellComponent
                    ],
                providers: [
                    {provide: AuthService, useValue: mockAuthSvc},
                    {provide: VoterService, useValue: mockVoterSvc},
                ],
                schemas: [NO_ERRORS_SCHEMA],
            }).compileComponents();

        }));

    beforeEach(() => {
            fixture = TestBed.createComponent(SessionListComponent);
            component = fixture.componentInstance;
            debugEl = fixture.debugElement;
            element = fixture.nativeElement;
        });

    describe('initail display', () => {

            it('it should have the correct sessio title', () => {
                component.sessions = [
                    {id: 3, name: 'session 1',
                     presenter: 'mani',
                     duration: 1,
                      level: 'beginner',
                       abstract: 'abstract',
                        voters: ['k', 'm']}
                    ];
                component.filterBy = 'all';
                component.sortBy = 'name';
                component.eventId = 4;

                component.ngOnChanges();
                fixture.detectChanges();

                expect(element.querySelector('[well-title]').textContent).toContain('session 1');

                // expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('session 1'); //using debug element
            });

        });

});
