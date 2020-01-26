import { NgModule } from '@angular/core';
import { LoggedHeaderComponent } from './logged-header/logged-header';
import { IonicModule } from 'ionic-angular';
import { MessageBoxComponent } from './message-box/message-box';
import { UserInfoComponent } from './user-info/user-info';
import { UserMenuComponent } from './user-menu/user-menu';

@NgModule({
	declarations: [LoggedHeaderComponent,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent],
	imports: [IonicModule],
	exports: [LoggedHeaderComponent,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent]
})

export class ComponentsModule {}
