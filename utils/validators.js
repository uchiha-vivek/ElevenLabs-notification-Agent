const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
const isValidPhone = (phone) => /^[+0-9\s-]{8,20}$/.test(phone);

module.exports = { isValidEmail, isValidPhone };
