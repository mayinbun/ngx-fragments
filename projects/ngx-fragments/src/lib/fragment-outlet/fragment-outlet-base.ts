import { Subject } from 'rxjs';

export abstract class FragmentOutletBase<T = any> {
  public whenClosed$ = new Subject<void>().asObservable();
  public queryParamValue: string | null | undefined = undefined;
  public whenQueryParamValueChanged$ = new Subject<string | null>().asObservable();
}
