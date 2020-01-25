import { NgModule } from '@angular/core';
import { LoggedHeaderComponent } from './logged-header/logged-header';
import { IonicModule } from 'ionic-angular';
import { MessageBoxComponent } from './message-box/message-box';

@NgModule({
	declarations: [LoggedHeaderComponent,
    MessageBoxComponent],
	imports: [IonicModule],
	exports: [LoggedHeaderComponent,
    MessageBoxComponent]
})

export class ComponentsModule {}
