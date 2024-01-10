$(document).ready(function () {
  $('.select-beauty').select2({
    width: '100%',
  })
  $('#other_language').select2({
    width: '100%',
  })
  $(document).on('change', '#country_code', (e) => {
    e.preventDefault()
    $.ajax({
      type: 'GET',
      url: `${appUrl}/common/fetch-region`,
      dataType: 'json',
      data: {
        code: $('#country_code').val(),
      },
      success: (response) => {
        $('#native_language_code').val(response.language)
        $('#country_name').val(response.name)
        $('select[name="currency"]').empty()
        response.currency.map((currency) => {
          $('select[name="currency"]').append(`<option value='${currency}'>${currency}</option>`)
        })

        $('select[name="timezone"]').empty()
        response.timezone.map((timezone) => {
          $('select[name="timezone"]').append(`<option value='${timezone}'>${timezone}</option>`)
        })

        const otherLangTotal = $('#other_language').val()
        if (otherLangTotal.length > 0) {
          $('#other_language').val(null).trigger('change')
        }
        $(`#other_language option`).prop('disabled', false)
        $(`#other_language option[value='${response.language}']`).prop('disabled', true)
      },
    })
  })

  $(document).on('submit', '#create-store-form', (e) => {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: `${appUrl}/admin/store`,
      data: $('#create-store-form').serialize(),
      beforeSend: () => {
        $('#submit-store').buttonLoader('start')
      },
      success: (response) => {
        notification('success', response.message)
        setTimeout(() => {
          window.location.href = `${appUrl}/admin/store`
        }, 2000)
      },
      error: (error) => {
        $('#submit-store').buttonLoader('stop')
        if (error.status === 422) {
          $.each(error.responseJSON.messages, (key, item) => {
            // $(`#${item.param}`).addClass('invalid-field')
            $(`#${item.param}-status`).text(item.msg)
            // if (item.param === 'country_code') {
            //   $('#country_code').data('select2').$container.addClass('invalid-field')
            // }
          })
        } else {
          notification('error', error.responseJSON.message)
        }
      },
    })
  })

  const loadStoreList = (pageUrl = false) => {
    let baseURL = `${appUrl}/admin/store/list`
    if (pageUrl == false) {
      var pageUrl = baseURL
    }
    $.ajax({
      type: 'GET',
      url: pageUrl,
      dataType: 'json',
      data: {
        name: $('#search_store').val(),
      },
      beforeSend: () => {
        $('.pagination').hide()
        $('#store-list-table tbody').html(`<tr><td colspan="4" class="text-center">${loader}</td></tr>`)
      },
      success: (response) => {
        let html = ''
        if (response.itemCount > 0) {
          response.items.forEach((item) => {
            html += `<tr>
          <td>${item.name}</td>
          <td class="text-left">${item.phone}</td>
          <td>${item.country}</td>
          <td>
            <a class="btn btn-info btn-sm btn-history" href="${appUrl}/admin/store/${item?.id}">
              <i class="fas fa-pencil-alt text-xs mr-1"></i>編集
            </a>
            <a class="btn btn-danger btn-sm btn-delete" href="${appUrl}/admin/store/${item?.id}">
                <i class="fas fa-trash mr-1"></i>削除
              </a>
          </td>
        </tr>`
          })

          let paginationHtml = ''
          const pagination = () => {
            if (response.is_previous) {
              paginationHtml += `<li class="page-item"><a class="page-link" href="${response.previous_url}">«</a></li>`
            }

            response.pages.map((page) => {
              let activePage = response.currentPage === page.number ? 'active' : ''
              paginationHtml += `<li class="page-item ${activePage}"><a class="page-link " href="${response.path}${page.number}">${page.number}</a></li>`
            })

            if (response.is_more) {
              paginationHtml += `<li class="page-item"><a class="page-link" href="${response.next_url}">»</a></li>`
            }

            return paginationHtml
          }

          $('.pagination').html(pagination).show()
          $('#store-list-table tbody').html(html)
        } else {
          $('#store-list-table tbody').html('<tr><td colspan="4" class="text-center">見つからないデータ</td></tr>')
        }
      },
      error: (error) => {
        $('.pagination').hide()
        $('#store-list-table tbody').html('<tr><td colspan="4" class="text-center">見つからないデータ</td></tr>')
      },
    })
  }
  if ($('#store-list-table').length > 0) {
    loadStoreList(`${appUrl}/admin/store/list?page=1`)
    $(document).on('input propertychange', '#search_store', (event) => {
      event.preventDefault()
      loadStoreList(`${appUrl}/admin/store/list?page=1`)
    })
    $(document).on('click', '.pagination a', (event) => {
      event.preventDefault()
      const element = $(event.currentTarget)
      let pageUrl = element.attr('href')
      loadStoreList(pageUrl)
      event.preventDefault()
    })
  }

  const fetchRegion = (tz, cr) => {
    $.ajax({
      type: 'GET',
      url: `${appUrl}/common/fetch-region`,
      dataType: 'json',
      data: {
        code: $('#country_code').val(),
      },
      success: (response) => {
        $('#native_language_code').val(response.language)
        $('#country_name').val(response.name)
        $('select[name="currency"]').empty()
        response.currency.map((currency) => {
          $('select[name="currency"]').append(
            `<option value='${currency}' ${currency === cr ? 'selected' : ''}>${currency}</option>`
          )
        })

        $('select[name="timezone"]').empty()
        response.timezone.map((timezone) => {
          $('select[name="timezone"]').append(
            `<option value='${timezone}' ${timezone === tz ? 'selected' : ''}>${timezone}</option>`
          )
        })
        $(`#other_language option`).prop('disabled', false)
        $(`#other_language option[value='${response.language}']`).prop('disabled', true)
      },
    })
  }
  if ($('.edit-store-wrapper').length > 0) {
    fetchRegion(storeTimezone, storeCurrency)
  }

  $(document).on('submit', '#edit-store-form', (e) => {
    e.preventDefault()
    $.ajax({
      type: 'PUT',
      url: `${appUrl}/admin/store/${storeId}`,
      data: $('#edit-store-form').serialize(),
      beforeSend: () => {
        $('#submit-store').buttonLoader('start')
      },
      success: (response) => {
        notification('success', response.message)
        setTimeout(() => {
          window.location.href = `${appUrl}/admin/store`
        }, 2000)
      },
      error: (error) => {
        $('#submit-store').buttonLoader('stop')
        if (error.status === 422) {
          $.each(error.responseJSON.messages, (key, item) => {
            // $(`#${item.param}`).addClass('invalid-field')
            $(`#${item.param}-status`).text(item.msg)
            // if (item.param === 'country_code') {
            //   $('#country_code').data('select2').$container.addClass('invalid-field')
            // }
          })
        } else {
          notification('error', error.responseJSON.message)
        }
      },
    })
  })

  $(document).on('click', '.btn-delete', (e) => {
    e.preventDefault()
    const element = $(e.currentTarget)
    const url = element.attr('href')
    Swal.fire({
      title: 'これを削除してもよろしいですか?',
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'はい',
      denyButtonText: 'キャンセル',
      confirmButtonColor: '#004F9E',
      cancelButtonColor: '#d33',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      preConfirm: () => {
        let promise = $.ajax({
          method: 'delete',
          url,
          dataType: 'json',
        })
        promise.done((response) => {
          Swal.fire({
            title: response.title,
            text: response.message,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          })
          loadStoreList(`${appUrl}/admin/store/list?page=1`)
        })
        promise.fail((jqXHR, textStatus, errorThrown) => {
          alert(`The following error occurred: ${jqXHR.responseJSON.message}`)
        })
        return promise
      },
    })
  })

  $('.is-translate').toggleClass('d-none', !$('#other_language').val().length)
  $('#other_language').on('change', function (e) {
    e.preventDefault()
    const isFilled = $(this).val().length > 0
    if (isFilled) {
      $('.is-translate').removeClass('d-none')
    } else {
      $('.is-translate').addClass('d-none')
      $('#is_translate').prop('checked', false)
    }
  })
})
$('ul.nav-sidebar a#menu_stores')
  .addClass('active')
  .parentsUntil('.nav-sidebar > .nav-treeview')
  .addClass('menu-open')
  .prev('a')
  .addClass('active')
