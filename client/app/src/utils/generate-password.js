export function generatePassword(length = 12) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  
  // Ensure at least one lowercase, one uppercase, one digit, and one symbol
  password += "abcdefghijklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 26));
  password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 26));
  password += "0123456789".charAt(Math.floor(Math.random() * 10));
  password += "!@#$%^&*()".charAt(Math.floor(Math.random() * 10));

  for (let i = 0, n = charset.length; i < length - 4; i++) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  
  // Shuffle the string to make it more random
  password = password.split('').sort(() => 0.5 - Math.random()).join('');
  
  return password;
}
