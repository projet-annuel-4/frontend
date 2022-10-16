import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { GroupProjectsCardComponent } from './group-projects-card.component'

describe('GroupProjectsCardComponent', () => {
  let component: GroupProjectsCardComponent
  let fixture: ComponentFixture<GroupProjectsCardComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupProjectsCardComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupProjectsCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
