import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Skill } from 'src/app/core/models/skill';

@Component({
  selector: 'app-skills-manager',
  templateUrl: './skills-manager.component.html',
  styleUrls: ['../profile.component.css']

})
export class SkillsManagerComponent {
  @Input() formGroup!: FormGroup;
  @Input() allSkills: Skill[] = [];
  @Input() knownSkills: Skill[] = [];
  @Input() skillsToLearn: Skill[] = [];

  @Output() addSkill = new EventEmitter<'known' | 'toLearn'>();
  @Output() removeSkill = new EventEmitter<{ skill: Skill; list: 'known' | 'toLearn' }>();
  errorKnown = false;
  errorToLearn = false;


  // getters
  get habilidadesControl(): FormControl {
    return this.formGroup.get('selectedSkillHabilidades') as FormControl;
  }

  get interesesControl(): FormControl {
    return this.formGroup.get('selectedSkillIntereses') as FormControl;
  }

  // 3 skills max
  canAddSkill(type: 'known' | 'toLearn'): boolean {
    if (type === 'known') return this.knownSkills.length < 3;
    if (type === 'toLearn') return this.skillsToLearn.length < 3;
    return false;
  }

  handleAddSkill(type: 'known' | 'toLearn') {
    if (!this.canAddSkill(type)) {
      if (type === 'known') {
        this.errorKnown = true;
        setTimeout(() => (this.errorKnown = false), 3000);
      } else if (type === 'toLearn') {
        this.errorToLearn = true;
        setTimeout(() => (this.errorToLearn = false), 3000);
      }
      return;
    }

    this.addSkill.emit(type);
  }


  isSkillSelected(type: 'known' | 'toLearn'): boolean {
    const control = this.formGroup.get(type === 'known' ? 'selectedSkillHabilidades' : 'selectedSkillIntereses');
    return !!control?.value;
  }

}
