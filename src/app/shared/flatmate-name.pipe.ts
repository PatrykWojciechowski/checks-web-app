import { Pipe, PipeTransform } from '@angular/core';
import {FlatmateService} from './flatmate.service';

@Pipe({
  name: 'flatmateName'
})
export class FlatmateNamePipe implements PipeTransform {

  constructor(
    private service: FlatmateService
  ){}


  transform(fmId: string): unknown {
    return this.service.flatmates.find(flatmate => fmId === flatmate.id).name;
  }

}
