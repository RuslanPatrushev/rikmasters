import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {PaginatorDirective} from "./shared/directives/paginator.directive";
import {TelPipe} from "./shared/pipes/tel.pipe";
import {ToolbarComponent} from "./shared/components/toolbar/toolbar.component";
import {SidenavComponent} from "./shared/components/sidenav/sidenav.component";
import {NavListComponent} from "./shared/components/sidenav/nav-list/nav-list.component";
import {FilterActionComponent} from "./shared/components/filter-action/filter-action.component";
import {MainContentComponent} from "./shared/components/main-content/main-content.component";
import {TableComponent} from "./shared/components/table/table.component";
import {StatusNamePipe} from "./shared/pipes/status-name.pipe";
import {MainComponent} from "./pages/main/main.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatMenuModule} from "@angular/material/menu";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {getRusPaginatorIntl} from "./core/utils/rus-paginator-intl";
import {NgxMaskDirective, provideEnvironmentNgxMask} from "ngx-mask";
import {MatSortModule} from "@angular/material/sort";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
        PaginatorDirective,
        TelPipe,
        ToolbarComponent,
        SidenavComponent,
        NavListComponent,
        FilterActionComponent,
        MainContentComponent,
        TableComponent,
        StatusNamePipe,
        MainComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        MatPaginatorModule,
        MatTableModule,
        MatInputModule,
        MatGridListModule,
        MatMenuModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        NgxMaskDirective,
        MatSortModule,
        HttpClientModule

    ],
    providers: [{provide: MatPaginatorIntl, useValue: getRusPaginatorIntl()}, provideEnvironmentNgxMask()],
    bootstrap: [AppComponent]
})
export class AppModule {
}
