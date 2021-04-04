import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyFeatureComponent } from './lazy-feature.component';

describe('LazyFeatureComponent', () => {
  let component: LazyFeatureComponent;
  let fixture: ComponentFixture<LazyFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LazyFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
