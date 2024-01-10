/**
 * Menu Handle
 */
$(
  `#global_nav #accordion li#menu_menu${
    content.includes('create') ? '_create' : content.includes('display-time') ? '_display-time' : ''
  }`
)
  .addClass('is-active')
  .parents('li.dropdown-parent')
  .addClass('menu-open')
  .removeClass('not-show')
  .find('button i.fa-solid')
  .removeClass('fa-angle-down')
  .addClass('fa-angle-up')
