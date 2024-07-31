export const clearEmptyProps = (object) => {
    const returnedObject = {};
    Object.keys(object).forEach((key) => {
      const value = object[key];
      if (value) {
        if (value instanceof Date) {
          const year = value.getFullYear();
          const month = String(value.getMonth() + 1).padStart(2, "0");
          const day = String(value.getDate()).padStart(2, "0");
          returnedObject[key] = `${year}-${month}-${day}`;
        } else {
          returnedObject[key] = value;
        }
      }
    });
  
    return returnedObject;
  };