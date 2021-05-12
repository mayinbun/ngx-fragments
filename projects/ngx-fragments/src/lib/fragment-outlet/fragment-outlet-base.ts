import { Subject } from 'rxjs';

export abstract class FragmentOutletBase<QueryParamValueType = any> {
  public whenClosed$ = new Subject<void>().asObservable();
  public queryParamValue: QueryParamValueType | null | undefined;
  public whenQueryParamValueChanged$ = new Subject<QueryParamValueType | null>().asObservable();
}
