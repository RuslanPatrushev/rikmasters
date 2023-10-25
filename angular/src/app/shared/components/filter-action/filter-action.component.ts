import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StatusEnum} from "../../../core/enums/status.enum";
import {TableService} from "../../../core/services/table.service";
import {UserForm} from "../../../core/models/user-form";
import {FILTER_ACTION} from "../../../core/constants/filter-action.const";
import {RoleEnum} from "../../../core/enums/role.enum";
import {FilterAction} from "./models";

@Component({
    selector: 'rik-filter-action',
    templateUrl: './filter-action.component.html',
    styleUrls: ['./filter-action.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterActionComponent {
    userForm: FormGroup;
    selectedStatus: StatusEnum = StatusEnum.Active;
    selectedRole: RoleEnum = RoleEnum.User;

    constructor(private tableService: TableService) {

        this.userForm = new FormGroup({
            name: new FormControl("", Validators.pattern("[a-zA-Z]*")),
            email: new FormControl("", [
                Validators.email
            ]),
            phone: new FormControl("", Validators.pattern("[0-9]{10}")),
            createAt: new FormControl(""),
            updateAt: new FormControl(""),
            isAdmin: new FormControl(""),
            status: new FormControl(""),
        });
    }

    onAddUser(): void {
        this.tableService.addUser()
    }

    filterValue(): UserForm {
        return {
            name: this.userForm.get("name")?.value,
            email: this.userForm.get("email")?.value,
            phone: this.userForm.get("phone")?.value,
            create_at: new Date(this.userForm.get("createAt")?.value).getTime(),
            update_at: new Date(this.userForm.get("updateAt")?.value).getTime(),
            is_admin: !!this.userForm.get("isAdmin")?.value,
            status: this.userForm.get("status")?.value,
        }
    }

    onApplyFilter(): void {
        this.tableService.onApplyFilter(this.filterValue())
    }

    onCancelFilter(): void {
        this.userForm.reset();
        this.tableService.onCancelFilter()
    }

    onBlockedUser(isBlocked: StatusEnum): void {
        this.tableService.onBlockedUser(isBlocked);
    }

    protected readonly StatusEnum = StatusEnum;
    protected readonly filterActions: FilterAction = FILTER_ACTION;
}
