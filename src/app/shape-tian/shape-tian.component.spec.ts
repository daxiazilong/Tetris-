import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeTianComponent } from './shape-tian.component';

describe('ShapeTianComponent', () => {
  let component: ShapeTianComponent;
  let fixture: ComponentFixture<ShapeTianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapeTianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeTianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
