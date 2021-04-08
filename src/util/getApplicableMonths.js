/**
 * Get the applicable months for an invesment given a starting date.
 *
 * @param {number} year
 * @param {string} month
 * @param {object[]}
 */
export default function getApplicableMonths(year, month, historicalByMonth) {
  const oldest = historicalByMonth.find(({ dateMonth, dateYear }) => {
    return dateYear === year && dateMonth === month;
  });

  const indexOfOldest = historicalByMonth.indexOf(oldest);

  return historicalByMonth.slice(0, indexOfOldest + 1);
}
