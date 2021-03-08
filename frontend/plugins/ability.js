import {Ability, AbilityBuilder} from '@casl/ability';
import {USER_ROLES} from "@/utils/enums";

export const ability = new Ability();

export default ({store}, inject) => {
  const {can, cannot, rules} = new AbilityBuilder();
  cannot('read', 'all');
  ability.update(rules);
  inject('ability', ability);

  return store.subscribe((mutation, state) => {
    if (mutation.type === 'SET_CURRENT_USER') {
      const user = store.state['users']['currentUser']
      console.log("TUT")
      switch (user.role) {
        case USER_ROLES.ADMIN:
          can('manage', 'all')
          ability.update(rules);
          inject('ability', ability);
          break
        case USER_ROLES.MANAGER:
          console.log("MANAGER")
          can('manage', 'all')
          ability.update(rules);
          inject('ability', ability);
          break
        default:
          cannot('manage', 'all')
          ability.update(rules);
          inject('ability', ability);
      }
    }
  })
}
