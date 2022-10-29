import {async, ComponentFixture, TestBed} from '@angular/core/testing'

import {MergeBranchComponent} from './merge-branch.component'

describe('MergeBranchComponent', () => {
  let component: MergeBranchComponent
  let fixture: ComponentFixture<MergeBranchComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MergeBranchComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeBranchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
