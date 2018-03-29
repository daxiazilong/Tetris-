import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeZhiComponent } from './shape-zhi.component';

describe('ShapeZhiComponent', () => {
  let component: ShapeZhiComponent;
  let fixture: ComponentFixture<ShapeZhiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapeZhiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeZhiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
