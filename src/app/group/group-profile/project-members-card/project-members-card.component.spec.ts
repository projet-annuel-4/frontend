import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ProjectMembersCardComponent } from './project-members-card.component'

describe('ProjectMembersCardComponent', () => {
  let component: ProjectMembersCardComponent
  let fixture: ComponentFixture<ProjectMembersCardComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectMembersCardComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMembersCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
