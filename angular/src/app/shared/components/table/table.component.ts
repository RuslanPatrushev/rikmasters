import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnDestroy, OnInit,
    ViewChild
} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";

import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {DateAdapter} from "@angular/material/core";
import {User} from "../../../core/models/user.model";
import {DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS} from "../../../core/constants/page.const";
import {TableService} from "../../../core/services/table.service";
import {COLUMN_TABLE} from "../../../core/constants/table.const";
import {WindowSizeService} from "../../../core/services/window-size.service";
import {WindowSizeEnum} from "../../../core/enums/window-size.enum";
import {StatusEnum} from "../../../core/enums/status.enum";
import {MatSort, Sort, SortDirection} from "@angular/material/sort";
import {TableColumnEnum} from "../../../core/enums/table-column.enum";
import {TableColumn} from "./model";
import {MatSelectChange} from "@angular/material/select";
import {MatTableDataSource, MatTableDataSourcePaginator} from "@angular/material/table";
import {ApiService} from "../../../core/services/api.service";
import {UserService} from "../../../core/services/user.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'rik-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TableComponent implements AfterViewInit, OnInit, OnDestroy {
    tableColumns: TableColumn[] = COLUMN_TABLE;
    pageSize = DEFAULT_PAGE_SIZE;
    pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS;

    tableSelection: SelectionModel<User>;
    displayedColumns: string[] = this.tableColumns.map((col: TableColumn) => col.name);
    dataSource: MatTableDataSource<User, MatTableDataSourcePaginator>;
    filteredData: User[] = [];
    sortState: Sort;
    usersSubscription$: Subscription = new Subscription();

    @ViewChild("paginator") paginator!: MatPaginator;
    @ViewChild("paginatorSecond") paginatorSecond!: MatPaginator;

    @ViewChild(MatSort) set matSort(sort: MatSort) {
        this.onSetSort(sort)
    }

    constructor(
        private dateAdapter: DateAdapter<Date>,
        private tableService: TableService,
        public windowSizeService: WindowSizeService,
        private apiService: ApiService,
        private userService: UserService
    ) {

        this.dateAdapter.setLocale("ru");
        this.tableSelection = this.tableService.tableSelection;
        this.dataSource = this.tableService.dataTableSource;
        this.sortState = this.tableService.sortState;
    }

    ngOnInit(): void {
        this.dataSource.filterPredicate = (user: User, filterString: string) =>
            this.tableService.filterPredicate(user, filterString)

        this.usersSubscription$ = this.userService.addUserStatus(
            this.userService.httpDataToUsers(
                this.apiService.getHttpData()))
            .subscribe((users: User[]): void => {
                this.tableService.dataTableSource.data = users;
                this.tableService.dataTableSource.data = users;
                this.tableService.filterData(this.paginator);
            });
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;

        this.tableService.filteredData$.subscribe((filteredData: User[]): void => {
            this.filteredData = filteredData;
        })

        this.paginatorSecond.page.subscribe((pageEvent: PageEvent): void => {
            this.paginator.page.next(pageEvent)
        })
    }

    ngOnDestroy(): void {
        if (!this.usersSubscription$.closed) {
            this.usersSubscription$.unsubscribe();
        }
    }

    onSetSort(sort: MatSort): void {
        this.tableService.onSetSort(sort);
    }

    isAllSelected(): boolean {
        return this.tableService.isAllSelected();
    }

    onChangeSort(sort: Sort): void {
        this.tableService.onChangeSort(sort, this.paginator);
    }

    toggleAllRows(event: MouseEvent): void {
        this.tableService.toggleAllRows(event);
    }

    checkboxLabel(row?: User): string {
        return this.tableService.checkboxLabel(row);
    }

    isAllChecked(): boolean {
        return this.tableService.isAllChecked();
    }

    isAllIndeterminate(): boolean {
        return this.tableService.isAllIndeterminate();
    }

    isCheckedCheckbox(row: User): boolean {
        return this.tableService.isCheckedCheckbox(row);
    }

    toggleRow(row: User): void {
        this.tableService.toggleRow(row);
    }

    sortDirection(): SortDirection {
        return this.tableService.sortDirection();
    }

    sortActive(): string {
        return this.tableService.sortActive();
    }

    announceSortChange(selectChange: MatSelectChange): void {
        this.tableService.announceSortChange(selectChange, this.paginator)
    }

    onChangePageSize($event: PageEvent): void {
        this.paginator.pageSize = $event.pageSize;
        this.pageSize = $event.pageSize
        this.tableService.filterData(this.paginator);
    }

    protected readonly StatusEnum = StatusEnum;
    protected readonly TableColumnEnum = TableColumnEnum;
    protected readonly WindowSizeEnum = WindowSizeEnum;
}
