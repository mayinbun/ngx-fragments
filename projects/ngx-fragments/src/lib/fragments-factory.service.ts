import { ComponentType } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Inject, Injectable, Injector } from '@angular/core';

/** @dynamic */
@Injectable({
  providedIn: 'root',
})
export class FragmentsFactoryService {
  private components: ComponentRef<any>[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private appRef: ApplicationRef,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
  ) {
  }

  public add<T>(
    component: ComponentType<T> | ComponentRef<T>,
    element?: Element | string | null,
  ): ComponentRef<T> {
    const componentRef = component instanceof ComponentRef
      ? component
      : this.resolver.resolveComponentFactory(component).create(this.injector);
    this.appRef.attachView(componentRef.hostView);
    if (typeof element === 'string') {
      element = this.document.querySelector(element);
    }
    if (!element) {
      element = this.document.body;
    }
    element.appendChild(
      (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement,
    );
    this.components.push(componentRef);
    return componentRef;
  }

  public remove(dialog: number | ComponentRef<any>): boolean {
    let componentRef;
    if (typeof dialog === 'number' && this.components.length > dialog) {
      componentRef = this.components.splice(dialog, 1)[0];
    } else {
      for (const cr of this.components) {
        if (cr === dialog) {
          componentRef = cr;
        }
      }
    }
    if (componentRef) {
      this.detachFromView(componentRef);
      return true;
    }
    return false;
  }

  private detachFromView(componentRef: ComponentRef<any>): void {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }

  public clear(): void {
    while (this.components.length > 0) {
      this.detachFromView(this.components.pop() as ComponentRef<any>);
    }
  }

  public getIndex(componentRef: ComponentRef<any>): number {
    return this.components.indexOf(componentRef);
  }
}
