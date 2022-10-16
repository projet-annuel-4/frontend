import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { RevertCommitComponent } from './revert-commit.component'

describe('RevertCommitComponent', () => {
  let component: RevertCommitComponent
  let fixture: ComponentFixture<RevertCommitComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RevertCommitComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RevertCommitComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
