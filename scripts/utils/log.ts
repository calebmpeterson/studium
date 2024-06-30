import _ from "lodash";

export const log = (...args: unknown[]) => {
  console.log(
    ...args.map((arg) => {
      if (_.isObject(arg) || _.isArray(arg)) {
        return JSON.stringify(arg, null, 2);
      }
      return arg;
    })
  );
};
