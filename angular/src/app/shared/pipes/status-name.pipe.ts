import {Pipe, PipeTransform} from "@angular/core";
import {StatusEnum} from "../../core/enums/status.enum";

@Pipe({name: 'statusName'})
export class StatusNamePipe implements PipeTransform {
    transform(status?: string | undefined): string {

        switch (status) {
            case StatusEnum.Active:
                return 'Активен';
            case StatusEnum.Blocked:
                return 'Заблокирован';

            default:
                return '-';
        }
    }
}
