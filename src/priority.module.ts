import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { IonicModule } from 'ionic-angular';
import { FormService } from './services/form.service';
import { ProcService } from './services/proc.service';
import { MessagesService } from './services/messages.service';
import { ConfigurationService } from './services/configuration.service';
import { PermissionsService } from './services/permissions.service';
import {PriorityService} from './services/priority.service';

import { ObjToIterable } from "./pipes/objToIterable.pipe";
import { FilterPipe } from "./pipes/filter.pipe";
import { SortPipe } from "./pipes/sort.pipe";

import { FileUploader } from './components/FileUploader/file-uploader.component';
import { DateTimeField } from './components/DateTime/date-time.component';
import { FormList } from './components/FormList/form-list.component';
import { FormItem } from './components/FormItem/form-item.component';
import { ItemDetails } from './components/ItemDetails/item-details.component';
import { ItemInput } from './components/ItemInput/item-input.component';
import { ItemInputOpts } from './components/ItemInputOpts/item-input-opts.component';
import { TextFormDisplay } from './components/TextFormDisplay/text-form-display.component';

import { ProgressBarHandler } from './popups/ProgressBar/progress-bar.handler';
import { ProgressBar } from './popups/ProgressBar/progress-bar.handler';
import { MenuPopup } from './popups/MenuPopup/menu-popup.handler';
import { MessageHandler } from './popups/Message/message.handler';
import { FilterMenu } from './popups/FilterMenu/filter-menu.handler';

import { BooleanDirective } from './directives/boolean.directive';
import { ValidationDirective } from './directives/validation.directive';
import { UpdateFieldDirective } from './directives/updateField.directive';
import { InnerHTML } from "./directives/innerHTML.directive";
import { ClickOutsideDirective } from "./directives/clickOutside.directive";

import * as priority from 'priority-web-sdk';

@NgModule({
  declarations: [
    DateTimeField,
    FileUploader,
    MenuPopup,
    BooleanDirective,
    ValidationDirective,
    UpdateFieldDirective,
    InnerHTML,
    ClickOutsideDirective,
    ObjToIterable,
    FilterPipe,
    SortPipe,
    FormList,
    FormItem,
    ItemDetails,
    ItemInput,
    ItemInputOpts,
    TextFormDisplay,
    FilterMenu,
    ProgressBar
  ],
  exports: [
    DateTimeField,
    FileUploader,
    MenuPopup,
    BooleanDirective,
    ValidationDirective,
    UpdateFieldDirective,
    InnerHTML,
    ClickOutsideDirective,
    ObjToIterable,
    FilterPipe,
    SortPipe,
    FormList,
    FormItem,
    ItemDetails,
    ItemInput,
    ItemInputOpts,
    TextFormDisplay,
    FilterMenu,
    ProgressBar
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule
  ],
  providers: [
    ConfigurationService,
    FormService,
    ProcService,
    MessagesService,
    MessageHandler,
    PermissionsService,
    ObjToIterable,
    FilterPipe,
    SortPipe,
    ProgressBarHandler,
    {provide:'priority-web-sdk', useValue:priority},
    PriorityService
  ],
  entryComponents: [
    FileUploader,
    MenuPopup,
    FilterMenu,
    ProgressBar
  ]
})
export class PriorityIonicModule {}
