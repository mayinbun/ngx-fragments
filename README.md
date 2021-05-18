# ngx-fragments

Ever needed a modal, popup or sidenav that worked based on the URL?  
This module takes care of that!

This module does NOT provide the implementation of above mentioned use cases.

[Demo](https://mayinbun.github.io/ngx-fragments/)

## Getting Started

```js
npm install ngx-fragments
```

## Usage

### Create Fragment Container Component

The container component is basically the component you want to render your child components content.  
Since this module does not provide any container components, we have to provide it to the module.

An example modal container component could look like this:

```ts
import { Component } from '@angular/core';
import { FragmentOutletComponent } from 'ngx-fragments';

@Component({
  styles: [`
   :host {
    position: relative;
    display: block;
  }
  
  /* The Modal (background) */
  .modal {
    display: block;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  
  .modal-content {
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
`],
  template: `
  
    <div class="modal" (click)="outerClick($event)">
    
        <div class="modal-content">
            <span class="close" (click)="outlet.close()">&times;</span>
            <ng-content></ng-content>
        </div>
        
    </div>

  `
})
export class MyCustomModalContainerComponent {
  constructor(public outlet: FragmentOutletComponent) {
  }

  public outerClick(event: any): void {
    event.stopPropagation();
    if (event.target.className === 'modal') {
      this.outlet.close();
    }
  }
}


```

By injecting the `FragmentOutletComponent` we have access to the `close` function.

### Create Entry Component
Now that we have a container, we will create a component which we want to show inside the container.  
For this we will create a simple `GreeterModalComponent`. This component will display the value of the queryParameter as greeting.

```js
import { Component } from '@angular/core';
import { FragmentOutletBase } from 'ngx-fragments';

@Component({
  styles: [
    `.greeting {
      font-size: 1.5rem;
      color: cornflowerblue;
      text-shadow: #333333;
    }
    `,
  ],
  template: `
    <div class="greeting">
      Greeting: {{ whenQueryParamValueChanged$ | async }}
    </div>
  `,
})
export class GreeterModalComponent extends FragmentOutletBase {
  constructor() {
    super();
  }
}
```

Notice that we extend `FragmentOutletBase` class. This class provides the following observables we can subscribe to.

| Property                    | Description
| --------------------------- | ---------------------------------- | 
| whenClosed$                 | Event on close                     |
| whenQueryParamValueChanged$ | Event on query param value changed |


### Provide the configuration
The configuration object is a dictionary of `Fragment` where each key can have his own `containerComponent` and `entries` list consisting out of `FragmentEntry` objects

```js
export interface Fragment {
  containerComponent: Type<any>;
  entries: FragmentEntry[];
}
```

| Property                    | Description
| --------------------------- | --------------------------------------------- | 
| containerComponent          | Angular component we want to use as container |
| entries                     | List of `FragmentEntry` objects               |


```js
export interface FragmentEntry {
  key: string;
  type: Type<T>;
  priority?: number;
}
```
| Property                    | Description
| --------------------------- | -------------------------------------------------------------------- | 
| key                         | The query parameter key to use to display this fragment              |
| type                        | The component to render inside the container                         |
| priority (optional)         | Useful if you want to control which fragment should always be on top |



#### Configuration (based on the example from above)

```js
const configuration = {
  modal: {
    containerComponent: MyCustomModalContainerComponent,
    entries: [
      {
        key: 'greeter',
        type: GreeterModalComponent,
      },
    ],
  }
}
```

Finally, pass the configuration to the forRoot method in your AppModule.

```js

@NgModule({
  imports: [
    NgxFragmentsModule.forRoot(configuration)
  ]
})
```

Or use `forFeature` for lazy loaded modules

```js
@NgModule({
  imports: [
    NgxFragmentsModule.forFeature(configuration)
  ]
})
```

To test the working, we have to navigate to the route we defined.  
Since our greeter modal is part of the `modal` parent object, the key `greeter` will automatically get prefixed with `modal:` to avoid query parameter collisions.
```js
 <a [routerLink]="[]" [queryParams]="{'modal:greeter': 'Hello from year 2021!'}" queryParamsHandling="merge">open greeter</a>
```
