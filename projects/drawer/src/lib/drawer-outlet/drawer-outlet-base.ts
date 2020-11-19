import { Subject } from 'rxjs';

export abstract class DrawerOutletBase<T = any> {
  public whenClosed$ = new Subject<void>().asObservable();
  public whenQueryParamValueChanged$ = new Subject<string | null>().asObservable();
}
