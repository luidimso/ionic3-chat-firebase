import { NgModule } from '@angular/core';
import { LoggedHeaderComponent } from './logged-header/logged-header';
import { IonicModule } from 'ionic-angular';
import { MessageBoxComponent } from './message-box/message-box';
import { UserInfoComponent } from './user-info/user-info';
import { UserMenuComponent } from './user-menu/user-menu';
import { ProgressBarComponent } from './progress-bar/progress-bar';

@NgModule({
	declarations: [LoggedHeaderComponent,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent,
    ProgressBarComponent],
	imports: [IonicModule],
	exports: [LoggedHeaderComponent,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent,
    ProgressBarComponent]
})

export class ComponentsModule {}
