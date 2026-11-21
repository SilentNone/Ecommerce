export const getSavedUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};
export const loadList = (prefix, userId) => {
  if (!userId) return [];
  try {
    return JSON.parse(localStorage.getItem(`${prefix}_${userId}`)) || [];
  } catch {
    return [];
  }
};
export const saveList = (prefix, userId, items) => {
  if (!userId) return;
  localStorage.setItem(`${prefix}_${userId}`, JSON.stringify(items));
};
