/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export const isExternal = (path: any) => /^(https?:|mailto:|tel:)/.test(path)

/**
 * @param {string} str
 * @returns {Boolean}
 */
/*export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}*/
