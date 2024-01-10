/**
 * Tax Handle
 */

// Menu sidebar active
$('#global_nav #accordion li#tax-settings')
  .addClass('is-active')
  .parents('li.dropdown-parent')
  .addClass('menu-open')
  .removeClass('not-show')
  .find('button i.fa-solid')
  .removeClass('fa-angle-down')
  .addClass('fa-angle-up')
