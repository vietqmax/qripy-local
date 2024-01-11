/**
 * Dish Options Handle
 */
$(document).ready(function () {
  /* List / Delete */
  if ($('#dish-option-list').length > 0) {
    function loadList(pageUrl = false) {
      const elementList = $('#dish-option-list')
      // const paginationList = elementList.find('.pagination-init')
      const list = elementList.find('.list-ul')
      if (pageUrl == false) {
        pageUrl = `${appUrl}/store/${langCurrent}/dish-option/list`
      }
      $.ajax({
        type: 'GET',
        url: pageUrl,
        dataType: 'json',
        data: {},
        beforeSend: () => {
          list.empty()
          // paginationList.html('')
          list.html('<li class="text-center"><i class="fas fa-spinner fa-spin"></i></li>')
        },
        success: (response) => {
          let html = ''
          response.items.forEach((item, index) => {
            html += `<li data-index="${index}" data-id="${item.id}">
              <button class="change-position" type="button"><i class="fa-solid fa-arrow-right-arrow-left fa-rotate-90"></i></button>
              <p>${item.name}</p>
              <button class="option" type="button"><i class="fa-solid fa-ellipsis-vertical"></i></button>
              <div class="box-option">
                <button class="edit" type="button">
                  <a href="${appUrl}/store/${langCurrent}/dish-option/${item.id}">
                    <i class="fa-solid fa-pen"></i>
                    <span>${response.textTranslate.btnEdit}</span>
                  </a>
                </button>
                <button
                class="delete"
                type="button"
                data-url="${appUrl}/store/${langCurrent}/dish-option/${item.id}"
                data-title="${response.textTranslate.notificationTitle}"
                data-text="${response.textTranslate.notificationText}"
                data-btn-confirm="${response.textTranslate.btnConfirm}"
                data-btn-cancel="${response.textTranslate.btnCancel}">
                  <i class="fa-solid fa-trash-can"></i>
                  <span>${response.textTranslate.btnDelete}</span>
                </button>
              </div>
            </li>`
          })
          // if (response.pages.length > 1) {
          //   let paginationHtml = ''
          //   const pagination = () => {
          //     paginationHtml += '<ul>'
          //     if (response.is_previous) {
          //       paginationHtml += `<li><a class="prev" href="${response.previous_url}"><i class="fa-solid fa-chevron-left"></i></a></li>`
          //     }
          //     response.pages.map((page) => {
          //       let activePage = response.currentPage === page.number ? 'current' : ''
          //       paginationHtml += `<li class="${activePage}"><a href="${response.path}${page.number}">${page.number}</a></li>`
          //     })
          //     if (response.is_more) {
          //       paginationHtml += `<li><a class="next" href="${response.next_url}"><i class="fa-solid fa-chevron-right"></i></a></li>`
          //     }
          //     paginationHtml += '</ul>'
          //     return paginationHtml
          //   }
          //   paginationList.html(pagination)
          // } else {
          //   paginationList.html('')
          // }
          list.html(html)
        },
        error: (error) => {
          // paginationList.html('')
          list.html(`<li class="text-center">${error.responseJSON.message}</li>`)
        },
      })
    }
    loadList(`${appUrl}/store/${langCurrent}/dish-option/list?page=1`)
    // $(document).on('click', '#dish-option-list .pagination-init li a', (event) => {
    //   event.preventDefault()
    //   const element = $(event.currentTarget)
    //   const pageUrl = element.attr('href')
    //   loadList(pageUrl)
    // })
    // Sortable
    $('#dish-option-list .list-ul').sortable({
      handle: '.change-position',
      cancel: '',
      stop: function async(event, ui) {
        updateSortOrder()
        let sortOrderList = {}
        $('#dish-option-list .list-ul li').each(function (index, item) {
          const dataIndex = $(this).attr('data-index')
          const dataId = $(this).attr('data-id')
          sortOrderList[dataId] = parseInt(dataIndex)
        })
        $.ajax({
          url: `${appUrl}/store/${langCurrent}/dish-option/sort-order`,
          type: 'PUT',
          dataType: 'json',
          data: { dishOptions: sortOrderList },
          beforeSend: () => {
            openLoading()
          },
          success: async (response) => {
            closeLoading()
            toastr.success(response.message)
          },
          error: (error) => {
            closeLoading()
            toastr.error(error.responseJSON.message)
          },
        })
      },
    })
    function updateSortOrder() {
      $('#dish-option-list .list-ul li').each(function (index) {
        const oldIndex = $(this).attr('data-index')
        const newIndex = oldIndex.replace(/^\d+$/, index)
        $(this).attr('data-index', newIndex)
      })
    }
    // Delete
    $(document).on('click', '#dish-option-list .list-ul button.delete', (event) => {
      event.preventDefault()
      const element = $(event.currentTarget)
      const url = element.attr('data-url')
      const currentUrl = window.location.href
      Swal.fire({
        title: element.attr('data-title'),
        text: element.attr('data-text'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: element.attr('data-btn-confirm'),
        cancelButtonText: element.attr('data-btn-cancel'),
        allowOutsideClick: false,
      }).then((confirm) => {
        if (confirm.isConfirmed) {
          $.ajax({
            url,
            type: 'DELETE',
            dataType: 'json',
            data: {},
            success: async (response) => {
              await Swal.fire({
                title: response.title,
                text: response.message,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
              })
              window.location.href = currentUrl
            },
            error: (error) => {
              Swal.fire({
                text: error.responseJSON.message,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
              })
            },
          })
        }
      })
    })
  }

  /* Handle common for create and edit */
  if ($('#dish-option-create').length > 0 || $('#dish-option-edit').length > 0) {
    // Dish option name translate
    let dishOptionNameInit
    $(document).on('focus', '#dish_option_name', async (event) => {
      event.preventDefault()
      const e = $(event.currentTarget)
      dishOptionNameInit = $.trim(e.val())
    })
    // Dish option name display translate
    let dishOptionNameDisplayInit
    $(document).on('focus', '#dish_option_name_display', async (event) => {
      event.preventDefault()
      const e = $(event.currentTarget)
      dishOptionNameDisplayInit = $.trim(e.val())
    })
    // Dish option item name translate
    let dishOptionItemNameInit
    $(document).on('focus', '#dish_option_item_name', async (event) => {
      event.preventDefault()
      const e = $(event.currentTarget)
      dishOptionItemNameInit = $.trim(e.val())
    })
    if (isTranslate) {
      // Dish option name display translate handle
      $(document).on('blur', '#dish_option_name_display', async (event) => {
        event.preventDefault()
        const e = $(event.currentTarget)
        const btnTranslate = e.closest('td').find('.btn-dish-option-name-display-translate')
        const btnList = e.closest('td').find('.btn-list')
        const text = $.trim(e.val())
        if (text !== dishOptionNameDisplayInit) {
          try {
            const result = await translateText(text)
            $.each(result.data, (key, item) => {
              $(`#dish_option_name_display_translate_${key}`).val(item)
            })
            btnTranslate.prop('disabled', false)
            btnList.prop('disabled', false)
            toastr.success(result.message)
          } catch (error) {
            btnTranslate.prop('disabled', true)
            btnList.prop('disabled', false)
            toastr.error(error?.message || 'Error translate API')
          }
        }
      })
      $(document).on('click', '.btn-dish-option-name-display-translate', async (event) => {
        event.preventDefault()
        const btnTranslate = $(event.currentTarget)
        const btnList = btnTranslate.closest('td').find('.btn-list')
        const text = $.trim(btnTranslate.closest('td').find('#dish_option_name_display').val())
        try {
          const result = await translateText(text)
          $.each(result.data, (key, item) => {
            $(`#dish_option_name_display_translate_${key}`).val(item)
          })
          btnTranslate.prop('disabled', false)
          btnList.prop('disabled', false)
          toastr.success(result.message)
        } catch (error) {
          btnTranslate.prop('disabled', true)
          btnList.prop('disabled', false)
          toastr.error(error?.message || 'Error translate API')
        }
      })
      // Dish option item name translate handle
      $(document).on('blur', '#dish_option_item_name', async (event) => {
        event.preventDefault()
        const e = $(event.currentTarget)
        const btnAll = e.closest('.translate-item').find('button')
        const text = e.val()
        if (text !== dishOptionItemNameInit) {
          try {
            const result = await translateText(text)
            $.each(result.data, (key, item) => {
              $(`#dish_option_item_name_translate_${key}`).val(item)
            })
            btnAll.prop('disabled', false)
          } catch (error) {
            btnAll.prop('disabled', true)
            await Swal.fire({
              text: error?.message || 'Error translate API',
              icon: 'error',
              showConfirmButton: false,
              timer: 2000,
            })
          }
        }
      })
    } else {
      // Dish option name translate handle
      $(document).on('change input', '#dish_option_name_display', async (event) => {
        event.preventDefault()
        const e = $(event.currentTarget)
        const btnTranslate = e.closest('td').find('.btn-dish-option-name-display-translate')
        const btnList = e.closest('td').find('.btn-list')
        const text = e.val()
        if (text) {
          btnTranslate.prop('disabled', false)
        } else {
          btnTranslate.prop('disabled', true)
          btnList.prop('disabled', true)
          $('#dish_option_name_display_translate').find('input').val('')
        }
      })
      $(document).on('click', '.btn-dish-option-name-display-translate', async (event) => {
        event.preventDefault()
        const btnTranslate = $(event.currentTarget)
        const btnList = btnTranslate.closest('td').find('.btn-list')
        const text = btnTranslate.closest('td').find('#dish_option_name_display').val()
        try {
          const result = await translateText(text)
          $.each(result.data, (key, item) => {
            $(`#dish_option_name_display_translate_${key}`).val(item)
          })
          btnTranslate.prop('disabled', false)
          btnList.prop('disabled', false)
          toastr.success(result.message)
        } catch (error) {
          btnTranslate.prop('disabled', true)
          btnList.prop('disabled', false)
          toastr.error(error?.message || 'Error translate API')
        }
      })
      // Dish option item name translate handle
      $(document).on('change input', '#dish_option_item_name', async (event) => {
        event.preventDefault()
        const e = $(event.currentTarget)
        const btnTranslate = e.closest('.translate-item').find('.btn-dish-option-item-name-translate')
        const btnList = e.closest('.translate-item').find('.btn-list')
        const btnAddItem = e.closest('.translate-item').find('.btn-add-item')
        const text = e.val()
        if (text) {
          btnTranslate.prop('disabled', false)
          btnAddItem.prop('disabled', false)
        } else {
          btnTranslate.prop('disabled', true)
          btnList.prop('disabled', true)
          btnAddItem.prop('disabled', true)
          $('#dish_option_item_name_translate').find('input').val('')
        }
      })
      $(document).on('click', '.btn-dish-option-item-name-translate', async (event) => {
        event.preventDefault()
        const btnTranslate = $(event.currentTarget)
        const btnList = btnTranslate.closest('.translate-item').find('.btn-list')
        const text = btnTranslate.closest('.translate-item').find('#dish_option_item_name').val()
        try {
          const result = await translateText(text)
          $.each(result.data, (key, item) => {
            $(`#dish_option_item_name_translate_${key}`).val(item)
          })
          btnTranslate.prop('disabled', false)
          btnList.prop('disabled', false)
          toastr.success(result.message)
        } catch (error) {
          btnTranslate.prop('disabled', true)
          btnList.prop('disabled', true)
          toastr.error(error?.message || 'Error translate API')
        }
      })
    }
    $(document).on('click', '.box-choices .btn-add-item', (event) => {
      event.preventDefault()
      const boxChoices = $('.box-choices')
      const btnDeleteText = boxChoices.attr('data-text-delete')
      const imgUrl = boxChoices.find('.drop-area .imgUrl').val()
      const valuesObject = {}
      $('.get_dish_option_item_name').each(function () {
        const name = $(this).attr('name')
        const value = $(this).val()
        const langCode = name.match(/\[(.*?)\]/)[1]
        valuesObject[langCode] = value
      })
      const totalLi = boxChoices.find('#box-item-choices').children('li').length
      let html = '<li>'
      $.each(valuesObject, function (key, value) {
        html += `<input type="hidden" name="items[${totalLi}][text][${key}]" value="${value}">`
      })
      html += `<input type="hidden" name="items[${totalLi}][img]" value="${imgUrl}">
                <button class="change-position" type="button"><i class="fa-solid fa-arrow-right-arrow-left fa-rotate-90"></i></button>
                <p>${valuesObject[langCurrent]}</p>
                <button class="option" type="button"><i class="fa-solid fa-ellipsis-vertical"></i></button>
                <div class="box-option">
                  <button class="delete" type="button"><i class="fa-solid fa-trash-can"></i><span>${btnDeleteText}</span></button>
                </div>`
      html += '</li>'
      boxChoices.find('#box-item-choices').append(html)
      $('.get_dish_option_item_name').val('')
      boxChoices.find('.drop-area .imgUrl').val('')
      boxChoices.find('.drop-area .img-preview').html('')
      closeModal('dish_option_item_name_translate')
      boxChoices.find('.dish_option_item_name').prop('disabled', true)
      boxChoices.find('.btn-dish-option-item-name-translate').prop('disabled', true)
      boxChoices.find('.btn-list').prop('disabled', true)
      boxChoices.find('.btn-add-item').prop('disabled', true)
    })
    $(document).on('click', '#box-item-choices button.delete', async (event) => {
      event.preventDefault()
      const e = $(event.currentTarget)
      e.closest('li').remove()
      updateInputNames()
    })
    $(document).on('click', '#box-item-choices button.delete-edit', async (event) => {
      event.preventDefault()
      const e = $(event.currentTarget)
      const li = e.closest('li')
      const originalInput = li.find('input[name^="items["]').first()
      const currentIndex = originalInput.attr('name').match(/\d+/)[0]
      const clonedInput = originalInput.clone()
      clonedInput.attr('name', `items[${currentIndex}][deleteId]`)
      li.prepend(clonedInput)
      li.hide()
      updateInputNames()
    })
    // Sortable
    $('#box-item-choices').sortable({
      handle: '.change-position',
      cancel: '',
      stop: function (event, ui) {
        updateInputNames()
      },
    })
    function updateInputNames() {
      $('#box-item-choices li').each(function (index) {
        $(this)
          .find('input[name^="items"]')
          .each(function () {
            const oldName = $(this).attr('name')
            const newName = oldName.replace(/\[\d+\]/, '[' + index + ']')
            $(this).attr('name', newName)
          })
      })
    }
  }

  /* Create */
  if ($('#dish-option-create').length > 0) {
    $(document).on('submit', '#dish-option-create', (event) => {
      event.preventDefault()
      const form = $(event.currentTarget)
      form.find('.border-red').removeClass('border-red')
      $.ajax({
        url: form.attr('action'),
        type: form.attr('method'),
        dataType: 'json',
        data: form.serialize(),
        beforeSend: () => {
          openLoading()
        },
        success: async (response) => {
          closeLoading()
          await Swal.fire({
            title: response.title,
            text: response.message,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          })
          window.location.href = `${appUrl}/store/${langCurrent}/dish-option`
        },
        error: (error) => {
          closeLoading()
          if (error.status === 422) {
            $.each(error.responseJSON.errors, (key, item) => {
              $(`#${item.param}`).addClass('border-red')
              toastr.error(item.msg)
            })
            $(`#${error.responseJSON.errors[0].param}`).trigger('focus')
          } else {
            toastr.error(error.responseJSON.message)
          }
        },
      })
    })
  }

  /* Edit */
  if ($('#dish-option-edit').length > 0) {
    $(document).on('click', '#box-item-choices button.edit', async (event) => {
      event.preventDefault()
      const e = $(event.currentTarget)
      const li = e.closest('li')
      const liId = li.attr('id')
      const img = li.find('input.dish_option_item_for_edit_img').val()
      const modal = $('#dish_option_edit_item')
      let htmlItems = ''
      li.find('.dish_option_item_for_edit').each(function (index, element) {
        htmlItems += `<div class="item" data-translate-id="${$(element).attr('id')}" data-translate-lang="${$(element).attr(
          'data-lang'
        )}">
        <label for="dish_option_edit_item_name_translate_${$(element).attr('data-lang')}">${$(element).attr('data-label')}</label>
        <input
        type="text" 
        name="dish_option_item_name[${$(element).attr('data-lang')}]"
        value="${$(element).val()}"
        id="dish_option_edit_item_name_translate_${$(element).attr('data-lang')}"
        class="get_dish_option_edit_item_name" />
        </div>`
      })
      modal.find('.drop-area-init input.imgUrl').val(img)
      if (img) {
        modal.find('.drop-area-init .img-preview').html(`<img class="img" src="${appUrl}/uploads/${img}">`)
      } else {
        modal.find('.drop-area-init .img-preview').html('')
      }
      modal.find('#dish_option_edit_item_content').attr('data-li', liId).html(htmlItems)
      openModal('dish_option_edit_item')
    })
    $(document).on('submit', '#dish-option-edit', (event) => {
      event.preventDefault()
      const form = $(event.currentTarget)
      form.find('.border-red').removeClass('border-red')
      $.ajax({
        url: form.attr('action'),
        type: form.attr('method'),
        dataType: 'json',
        data: form.serialize(),
        beforeSend: () => {
          openLoading()
        },
        success: async (response) => {
          closeLoading()
          await Swal.fire({
            title: response.title,
            text: response.message,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          })
          window.location.href = `${appUrl}/store/${langCurrent}/dish-option/${response.id}`
        },
        error: (error) => {
          closeLoading()
          if (error.status === 422) {
            $.each(error.responseJSON.errors, (key, item) => {
              $(`#${item.param}`).addClass('border-red')
              toastr.error(item.msg)
            })
            $(`#${error.responseJSON.errors[0].param}`).trigger('focus')
          } else {
            toastr.error(error.responseJSON.message)
          }
        },
      })
    })
  }
})

// Menu sidebar active
$('#global_nav #accordion li#menu_dish_options')
  .addClass('is-active')
  .parents('li.dropdown-parent')
  .addClass('menu-open')
  .removeClass('not-show')
  .find('button i.fa-solid')
  .removeClass('fa-angle-down')
  .addClass('fa-angle-up')
