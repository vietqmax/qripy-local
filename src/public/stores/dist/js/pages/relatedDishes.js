function displayTranslate(className) {
  $(`.${className}`).removeClass('d-none')
}
// Menu sidebar active
$('#global_nav #accordion li#menu_related_dishes')
  .addClass('is-active')
  .parents('li.dropdown-parent')
  .addClass('menu-open')
  .removeClass('not-show')
  .find('button i.fa-solid')
  .removeClass('fa-angle-down')
  .addClass('fa-angle-up')
