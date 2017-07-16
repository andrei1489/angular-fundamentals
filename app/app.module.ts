import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http'
import { FormsModule, ReactiveFormsModule} from '@angular/forms'

import {
	EventsListComponent,
	EventThumbnailComponent,
	EventService,
	EventDetailsComponent,
	CreateEventComponent,
	EventListResolver,
	CreateSessionComponent,
	SessionListComponent,
	DurationPipe,
	UpvoteComponent,
	VoterService,
	LocationValidator,
	EventResolver

} from './events/index'
import { EventsAppComponent } from './events-app.component'
import { NavBarComponent } from './nav/navbar.component'

import { 
	CollapsibleWellComponent,
	TOASTR_TOKEN,
	Toastr,
	JQ_TOKEN,
	SimpleModalComponent,
	ModalTriggerDirective
		
} from './common/index'
import { appRouters } from './routes'
import { Error404Component } from './errors/404.component'
import { AuthService } from './user/auth.service'

declare let toastr:Toastr;
declare let jQuery:Object;
@NgModule ({
	imports: [
		BrowserModule,
		RouterModule.forRoot(appRouters),
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
	],
	declarations: [
	EventsAppComponent,
	EventsListComponent,
	EventThumbnailComponent,
	NavBarComponent,
	EventDetailsComponent,
	CreateEventComponent,
	Error404Component,
	CreateSessionComponent,
	SessionListComponent,
	CollapsibleWellComponent,
	DurationPipe,
	SimpleModalComponent,
	ModalTriggerDirective,
	UpvoteComponent,
	LocationValidator
	],
	bootstrap: [EventsAppComponent],
	providers: [
		EventService, 
		{provide:TOASTR_TOKEN, useValue: toastr}, 
		{provide:JQ_TOKEN, useValue: jQuery}, 
		EventListResolver,
		AuthService,
		VoterService,
		EventResolver,
	{provide: 'CanDeactivateNewEvent',useValue: checkDirtyState}]
})
export class AppModule {}
	function checkDirtyState(component:CreateEventComponent){
		if (component.isDirty){
			return window.confirm("The entry has not been saved. Are you sure you want to leave?");
		}
		return true;
	}
