const omitBy = (obj, ...args) => {
  let iterator = 0;
  let filteredObj = obj;

  const filterObj = () => {
    if (iterator < args.length) {
      iterator = iterator + 1;
      for (var propName in filteredObj) {
        if (filteredObj[propName] === args[iterator]) {
          delete filteredObj[propName];
        }
      }
      filterObj(filteredObj, args);
    }
  };
  filterObj();
  return filteredObj;
};

export default omitBy;
