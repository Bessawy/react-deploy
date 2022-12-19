export function setStringtoInt(
  value: number,
  setvalue: React.Dispatch<React.SetStateAction<number>>,
  e_value: string
) {
  setvalue(parseFloat(e_value));
  if (value < 0 || e_value === "") {
    setvalue(0);
  }
}

export function changeToFloat(e_value: string) {
  let val = parseFloat(e_value);
  if (val < 0 || e_value === "") {
    return 0;
  } else {
    return val;
  }
}
