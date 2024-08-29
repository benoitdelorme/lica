
/* 
  const str = "key1:value1,key2:value2,key3:value3";

  // Result
  {
    key1: "value1",
    key2: "value2",
    key3: "value3"
  }
 */
export const parseString = (str) => {
  const obj = {};
  str.split(',').forEach(pair => {
    const [key, value] = pair.split(':');
    obj[key.trim()] = value.trim();
  });
  return obj;
};