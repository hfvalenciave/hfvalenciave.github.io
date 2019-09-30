import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
    name: 'time'
})
export class TimePipe implements PipeTransform {

    transform(time: string, ...args: any[]): any {
        if (isNullOrUndefined(time)) { return '00:00'; }

        const timeArray = time.split(':');
        let hour = parseInt(timeArray[0], 10);
        let period = 'am';
        if (hour > 12) {
            hour -= 12;
            period = 'pm';
        }

        timeArray[0] = (hour < 10) ? `0${hour}` : hour.toString();
        return `${timeArray.join(':')} ${period}`;
    }

}
