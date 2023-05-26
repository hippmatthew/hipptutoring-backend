type DateAvailability = {
  available: Boolean;
  times: [Boolean];
};

type Rules = {
  repetition: [DateAvailability];
  blacklist: [String?];
};

type RuleGenerator = () => Rules;

const generate_default_rules: RuleGenerator = () => {
  let times: [Boolean];
  for (let i = 0; i < 24; i++) {
    if (i > 8 && i < 17) times.push(true);
    else times.push(false);
  }

  let repetition: [DateAvailability];
  for (let i = 0; i < 7; i++) {
    if (i > 5) {
      repetition.push({
        available: false,
        times: [null],
      });
    } else {
      repetition.push({
        available: true,
        times,
      });
    }
  }

  return {
    repetition,
    blacklist: [],
  };
};

export default generate_default_rules;
