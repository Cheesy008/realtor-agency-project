import {Ability, AbilityBuilder} from '@casl/ability';
export const ability = new Ability();

export default ({store}, inject) => {
  const {cannot, rules} = new AbilityBuilder();
  cannot('read', 'all');
  ability.update(rules);
  console.log("TUT")
  inject('ability', ability);

}
