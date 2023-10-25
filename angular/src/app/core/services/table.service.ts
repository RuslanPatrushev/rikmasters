import {Injectable} from "@angular/core";
import {User} from "../models/user.model";
import {SelectionModel} from "@angular/cdk/collections";
import {MatSelectChange} from "@angular/material/select";
import {MatTableDataSource, MatTableDataSourcePaginator} from "@angular/material/table";
import {UserForm} from "../models/user-form";
import {StatusEnum} from "../enums/status.enum";
import {MatSort, Sort, SortDirection} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {BehaviorSubject} from "rxjs";
import {LOCAL_STORAGE} from "../constants/local-storage..consts";

@Injectable({
    providedIn: "root"
})
export class TableService {
    filteredData$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    dataTableSource: MatTableDataSource<User, MatTableDataSourcePaginator> = new MatTableDataSource();
    tableSelection: SelectionModel<User> = new SelectionModel<User>(true, []);
    sortState: Sort = {active: "", direction: ""};

    addUser(user?: User): void {
    }

    isAllSelected(): boolean {
        const numSelected = this.tableSelection.selected.length;
        const numRows = this.dataTableSource.data.length;
        return numSelected === numRows;
    }

    toggleAllRows(event: MouseEvent): void {
        event.stopPropagation();

        if (this.isAllSelected()) {
            this.tableSelection.clear();
            return;
        }
        this.tableSelection.select(...this.dataTableSource.data);
    }

    checkboxLabel(row?: User): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.tableSelection.isSelected(row) ? 'deselect' : 'select'} row
    ${this.dataTableSource.data.findIndex((user: User): boolean => user == row)}`;
    }

    isAllChecked(): boolean {
        return this.tableSelection.hasValue() && this.isAllSelected()
    }

    isAllIndeterminate(): boolean {
        return this.tableSelection.hasValue() && !this.isAllSelected()
    }

    isCheckedCheckbox(row: User): boolean {
        return this.tableSelection.isSelected(row)
    }

    toggleRow(row: User): void {
        this.tableSelection.toggle(row)
    }

    onApplyFilter(filter: UserForm): void {

        let obj = Object.entries(filter).filter((val) => {
            return !!val[1];
        })
        this.dataTableSource.filter = JSON.stringify(obj);
        this.filterData();
    }

    onCancelFilter(): void {
        this.dataTableSource.filter = "";
        this.filterData();
    }


    onBlockedUser(isBlocked: StatusEnum): void {
        this.dataTableSource.filter = "";
        this.dataTableSource.data.forEach((user) => {
            if (this.tableSelection.selected.includes(user)) {
                user.status = isBlocked;
            }
        })
        this.tableSelection.selected;
        this.statusListToStorage()
    }

    onSetSort(sort: MatSort): void {
        this.dataTableSource.sort = sort;

        if (sort) {
            this.dataTableSource.sort.active = this.sortState.active;
            this.dataTableSource.sort.direction = this.sortState.direction;
            this.dataTableSource.sort.sortChange.emit(this.sortState);
        }
    }

    onChangeSort(sort: Sort, paginator: MatPaginator): void {
        this.sortState.active = !sort.direction ? "" : sort.active;
        this.sortState.direction = !sort.direction ? "" : sort.direction;
        this.filterData(paginator);
    }

    filterData(paginator?: MatPaginator): void {
        if (!this.dataTableSource.sort) {
            this.filteredData$.next([...this.dataTableSource.filteredData])
            return;
        }
        if (paginator) {
            this.filteredData$.next(
                this.dataTableSource.sortData(
                    [...this.dataTableSource.filteredData].filter((user: User, ind: number): boolean => {
                        return ind >= paginator.pageSize * paginator.pageIndex
                    }).filter((user: User, ind: number): boolean => {
                        return ind < paginator.pageSize
                    }), this.dataTableSource.sort!));
            return;
        }
        this.filteredData$.next(
            this.dataTableSource.sortData(
                [...this.dataTableSource.filteredData], this.dataTableSource.sort!));
    }

    announceSortChange(selectChange: MatSelectChange, paginator: MatPaginator): void {

        this.sortState.active = selectChange.value;
        this.sortState.direction = 'asc';

        if (!this.dataTableSource.sort) {
            this.dataTableSource.sort = new MatSort()
        }

        this.dataTableSource.sort.active = this.sortState.active;
        this.dataTableSource.sort.direction = this.sortState.direction;
        this.dataTableSource.sort.sortChange.emit(this.sortState);

        this.filterData(paginator)
    }

    sortDirection(): SortDirection {
        return this.dataTableSource.sort?.direction ? this.dataTableSource.sort.direction : '';
    }

    sortActive(): string {
        return this.dataTableSource.sort?.active ? this.dataTableSource.sort!.active : 'none';
    }

    statusListToStorage(): void {
        localStorage.setItem(LOCAL_STORAGE,
            JSON.stringify(this.dataTableSource.data.map((user: User): [number, StatusEnum] => {
                return [user.id, user.status!];
            })));
    }


    filterPredicate(user: User, filterString: string): boolean {
        let filter: Map<string, string | number | boolean> = new Map(JSON.parse(filterString));//todo
        for (let [key, value] of filter) {
            if (value != user[key as keyof User]) {
                return false;
            }
        }
        return true;
    }
}
