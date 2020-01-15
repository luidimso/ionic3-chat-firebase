import { NgModule } from '@angular/core';
import { LoggedHeaderComponent } from './logged-header/logged-header';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [LoggedHeaderComponent],
	imports: [IonicModule],
	exports: [LoggedHeaderComponent]
})

export class ComponentsModule {}
