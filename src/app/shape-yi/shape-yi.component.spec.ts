import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeYi } from './shape-yi.component';

describe('ShapeYiComponent', () => {
  let component: ShapeYi;
  let fixture: ComponentFixture<ShapeYi>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapeYi ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeYi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
