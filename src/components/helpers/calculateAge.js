export function calculate_age(e) {
  let dob = "";
  if (!e.target) {
    dob = e
  }else{
    dob = e.target.value
  }
  // const  dob = e
  const birthDate = new Date(dob);
  const difference = Date.now() - birthDate.getTime();
  const age = new Date(difference);
  const ageMom = Math.abs(age.getUTCFullYear() - 1970);
  return ageMom
}