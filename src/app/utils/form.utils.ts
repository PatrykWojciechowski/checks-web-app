import {AbstractControl} from "@angular/forms";

export namespace FormUtils {
  export type Config<T> = {
    [key in keyof T]: AbstractControl
  };

}
