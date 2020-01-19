export const ClassFunctions = {
  getPositionClass: positionClass
};

function positionClass(position: number) {
  let classAtr: string = "";

  switch (position) {
    case 1:
      classAtr = "first";
      break;
    case 2:
      classAtr = "second";
      break;
    case 3:
      classAtr = "third";
      break;
    default:
      classAtr = "no-position";
  }

  return classAtr;
}
