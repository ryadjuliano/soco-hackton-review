const props = {
  // margin
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mh: 'marginHorizontal',
  mv: 'marginVertical',
  // padding
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  ph: 'paddingHorzontal',
  pv: 'paddingVertical',
};

const space = (arg) =>
  Object.fromEntries(
    arg.split(' ').map((item) => {
      let [key, value] = item.split('-');
      key = props[key];
      value = isNaN(value) ? value : parseInt(value);
      return [key, value];
    }),
  );

export default space;
