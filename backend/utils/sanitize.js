/* ✅ Input Sanitization Utilities */

/**
 * Sanitize string input by trimming and removing XSS-prone characters
 * @param {string} input - The input string to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeString = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .substring(0, 500); // Limit length
};

/**
 * Sanitize email by trimming and converting to lowercase
 * @param {string} email - The email to sanitize
 * @returns {string} - Sanitized email
 */
export const sanitizeEmail = (email) => {
  if (typeof email !== 'string') return '';
  return email.trim().toLowerCase();
};

/**
 * Sanitize number input
 * @param {any} input - The input to sanitize
 * @returns {number} - Sanitized number
 */
export const sanitizeNumber = (input) => {
  const num = Number(input);
  return isNaN(num) ? 0 : num;
};

/**
 * Sanitize URL
 * @param {string} url - The URL to sanitize
 * @returns {string} - Sanitized URL
 */
export const sanitizeURL = (url) => {
  if (typeof url !== 'string') return '';
  try {
    const urlObj = new URL(url.trim());
    return urlObj.href;
  } catch {
    return '';
  }
};

/**
 * Sanitize object with mixed inputs
 * @param {object} obj - The object to sanitize
 * @returns {object} - Sanitized object
 */
export const sanitizeObject = (obj) => {
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === 'number') {
      sanitized[key] = sanitizeNumber(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
};
