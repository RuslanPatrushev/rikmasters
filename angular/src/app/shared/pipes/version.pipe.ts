import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'version'
})
export class VersionPipe implements PipeTransform {

    transform(version: String, ...args: unknown[]): String {
        return "v" + version.substring(0,version.lastIndexOf("."));
    }

}
