export const getFormattedDate = (date) => {
  const utcDate = new Date(date)
  return `${utcDate.getDate()}/${utcDate.getMonth()}/${utcDate.getFullYear()}`
}