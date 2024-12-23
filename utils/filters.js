/**
 * Converts a date string to a short month format.
 *
 * @param {string} dateString - The date string to be converted.
 * @returns {string} The formatted date string with short month and numeric year.
 */
export const dateStringToShortMonth = (dateString) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });
};

/**
 * Converts a given date to a string formatted as YYYY-MM-DD.
 *
 * @param {Date|string|number} date - The date to be converted. Can be a Date object, a date string, or a timestamp.
 * @returns {string} The formatted date string in YYYY-MM-DD format.
 */
export const dateToYYYYMMDD = (date) => {
  return new Date(date).toLocaleDateString(undefined, {
    dateStyle: "short",
  });
};

export const readableDate = (date) => {
  return date.toLocaleString(undefined, {
    dateStyle: "full",
  });
};

/**
 * Returns the first `n` elements of an array. If `n` is negative, returns the last `n` elements.
 *
 * @param {Array} array - The array to query.
 * @param {number} n - The number of elements to return.
 * @returns {Array} The first `n` elements of the array, or the last `n` elements if `n` is negative.
 */
export const head = (array, n) => {
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }
  if (n < 0) {
    return array.slice(n);
  }

  return array.slice(0, n);
};

/**
 * Returns the minimum value from a list of numbers.
 *
 * @param {...number} numbers - A list of numbers to evaluate.
 * @returns {number} The smallest number in the list.
 */
export const minValue = (...numbers) => {
  return Math.min.apply(null, numbers);
};

/**
 * Filters out specific tags from a list of tags.
 *
 * This function removes the tags "all", "nav", "post", and "posts" from the provided list of tags.
 *
 * @param {string[]} tags - The list of tags to filter.
 * @returns {string[]} The filtered list of tags.
 */
export function filterTagList(tags) {
  return (tags || []).filter(
    (tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1
  );
}

/**
 * Extracts a list of unique tags from a collection of items.
 *
 * @param {Object} collection - The collection of items.
 * @param {Function} collection.getAll - Function that returns an array of all items in the collection.
 * @param {Array} collection.getAll[].data.tags - Array of tags associated with an item.
 * @returns {Array} - An array of unique tags.
 */
export function getTagList(collection) {
  let tagSet = new Set();
  collection.getAll().forEach((item) => {
    (item.data.tags || []).forEach((tag) => tagSet.add(tag));
  });

  return filterTagList([...tagSet]);
}
