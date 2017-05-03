import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ClickOutsideModule } from 'ng-click-outside';
import { FormService } from './services/form.service';
import { ProcService } from './services/proc.service';
import { ConfigurationService } from './services/configuration.service';
import { PermissionsService } from './services/permissions.service';

import { ObjToIterable } from "./pipes/objToIterable.pipe";
import { FilterPipe } from "./pipes/filter.pipe";
import { SortPipe } from "./pipes/sort.pipe";

import { FileUploader } from './components/FileUploader/file-uploader.component';
import { DateTimeField } from './components/DateTime/date-time.component';
import { FormList } from './components/FormList/form-list.component';
import { FormCardItem } from './components/FormCardItem/form-card-item.component';
import { FormItem } from './components/FormItem/form-item.component';
import { ItemDetails } from './components/ItemDetails/item-details.component';
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


@NgModule({
  declarations: [
    DateTimeField,
    FileUploader,
    MenuPopup,
    BooleanDirective,
    ValidationDirective,
    UpdateFieldDirective,
    InnerHTML,
    ObjToIterable,
    FilterPipe,
    SortPipe,
    FormList,
    FormItem,
    FormCardItem,
    ItemDetails,
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
    ObjToIterable,
    FilterPipe,
    SortPipe,
    FormList,
    FormItem,
    FormCardItem,
    ItemDetails,
    TextFormDisplay,
    FilterMenu
  ],
  imports: [
    // CommonModule,
    IonicModule,
    ClickOutsideModule
  ],
  providers: [
    ConfigurationService,
    FormService,
    ProcService,
    MessageHandler,
    PermissionsService,
    ObjToIterable,
    FilterPipe,
    SortPipe,
    ProgressBarHandler
  ],
  entryComponents: [
    FileUploader,
    MenuPopup,
    FilterMenu,
    ProgressBar
  ]
})
export class PriorityIonicModule { }
