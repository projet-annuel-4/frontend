import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeExecutionComponent } from './code-execution.component';

describe('CodeExecutionComponent', () => {
  let component: CodeExecutionComponent;
  let fixture: ComponentFixture<CodeExecutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeExecutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
