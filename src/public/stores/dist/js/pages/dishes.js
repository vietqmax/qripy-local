/**
 * Dish Handle
 */
$(`#global_nav #accordion li#menu_dishes${content.includes('create') ? '_create' : ''}`)
  .addClass('is-active')
  .parents('li.dropdown-parent')
  .addClass('menu-open')
  .removeClass('not-show')
  .find('button i.fa-solid')
  .removeClass('fa-angle-down')
  .addClass('fa-angle-up')
