export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email.trim());

export const isValidPhone = (phone) => !phone || /^\d{10}$/.test(phone);

export const getPasswordError = (password) => {
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Za-z]/.test(password)) return "Password needs at least one letter.";
  if (!/\d/.test(password)) return "Password needs at least one number.";
  return "";
};
