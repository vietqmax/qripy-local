/* eslint-disable block-scoped-var */
/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable func-names */

/**
 * Toast Alert
 */
toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-top-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '3000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
}

/**
 * Loading
 */
function openLoading() {
  $('body').append('<div class="loading-panel"><div class="spinner"></div></div>')
}
function closeLoading() {
  $('body .loading-panel').remove()
}

/**
 * Change lang
 */
$('.lang').change(function (e) {
  e.preventDefault()
  const value = $(this).val()
  const url = window.location.pathname
  const lang = url.split('/')[2]
  const regex = new RegExp(`/${lang}/`, 'g')
  const modifiedUrl = url.replace(regex, `/${value}/`)
  window.location.href = `${appUrl}${modifiedUrl}`
})

/**
 * Change Store or Cashier
 */
$('#select-header').change(function (e) {
  e.preventDefault()
  const value = $(this).val()
  const url = window.location.pathname
  const urlArr = url.split('/')
  window.location.href = `${appUrl}/${value}/${urlArr[2]}/dashboard`
})

/**
 * Loader button
 */
;(function ($) {
  // $('.has-spinner').attr('disabled', false)
  $.fn.buttonLoader = function (action) {
    var self = $(this)
    if (action == 'start') {
      if ($(self).attr('disabled') == 'disabled') {
        return false
      }
      $(self).attr('disabled', true)
      $(self).attr('data-btn-text', $(self).text())
      var text = 'Loading'
      if ($(self).attr('data-load-text') != undefined && $(self).attr('data-load-text') != '') {
        var text = $(self).attr('data-load-text')
      }
      $(self).html(
        `<span class="spinner"><i class="fa-duotone fa-spinner-third fa-spin fa-lg inline-block"></i></span> ${$(self).attr(
          'data-btn-text'
        )}`
      )
      $(self).addClass('active')
    }
    if (action == 'stop') {
      $(self).html($(self).attr('data-btn-text'))
      $(self).removeClass('active')
      $(self).attr('disabled', false)
    }
  }
})(jQuery)

/**
 * Name kana
 */
function nameKana(element, kanji) {
  // eslint-disable-next-line no-undef
  let kana = wanakana.toKatakana(kanji)
  $(`input#${element}`).val(kana)
}

/**
 * Modal
 */
function openModal(elementId) {
  const modal = document.getElementById(elementId)
  $(modal).fadeIn()
  $('body').addClass('overflow-hidden')
  return false
}
function closeModal(elementId) {
  const modal = document.getElementById(elementId)
  $(modal).fadeOut()
  $('body').removeClass('overflow-hidden')
  return false
}

/**
 * Translate
 */
function translateText(string) {
  return new Promise((resolve, reject) => {
    const text = $.trim(string)
    $.ajax({
      type: 'GET',
      url: `${appUrl}/common/translate-text`,
      dataType: 'json',
      data: {
        text,
        langCurrent,
      },
      beforeSend: () => {
        openLoading()
      },
      success: (response) => {
        closeLoading()
        resolve({ status: true, message: response?.message, data: response?.data })
      },
      error: (err) => {
        closeLoading()
        reject({ status: false, message: err.responseJSON.message })
      },
    })
  })
}

/**
 * Upload Img
 */
let imgDropArea = $('.drop-area-img')
// Prevent default drag behaviors
imgDropArea.on('dragenter dragover dragleave drop', function (e) {
  e.preventDefault()
  e.stopPropagation()
})
// Highlight drop area when a file is dragged over it
imgDropArea.on('dragenter dragover', function () {
  imgDropArea.addClass('highlight')
})
// Unhighlight drop area when a file is dragged out of it
imgDropArea.on('dragleave drop', function () {
  imgDropArea.removeClass('highlight')
})

function uploadImgDrop(event, route = false, inputName = 'img') {
  const files = event.dataTransfer.files
  const imgData = files[0]
  const formData = new FormData()
  formData.append(inputName, imgData)
  $.ajax({
    url: route,
    type: 'POST',
    dataType: 'json',
    processData: false,
    contentType: false,
    cache: false,
    data: formData,
    beforeSend: function () {
      openLoading()
    },
    success: async (response) => {
      closeLoading()
      const parent = $(event.target).closest('.drop-area')
      parent.find('.imgUrl').val(response.key)
      parent.find('.img-preview').html(`<img class="img" src="${response.path}">`)
    },
    error: (error) => {
      closeLoading()
      Swal.fire({
        title: '通知',
        text: error.responseJSON.message,
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      })
    },
  })
}

function uploadImg(route = false, inputName = 'img', event) {
  const element = $(event)
  const imgData = element[0].files[0]
  const formData = new FormData()
  formData.append(inputName, imgData)
  $.ajax({
    url: route,
    type: 'POST',
    dataType: 'json',
    processData: false,
    contentType: false,
    cache: false,
    data: formData,
    beforeSend: function () {
      openLoading()
    },
    success: async (response) => {
      closeLoading()
      const parent = element.closest('.drop-area')
      parent.find('.imgUrl').val(response.key)
      parent.find('.img-preview').html(`<img class="img" src="${response.path}">`)
    },
    error: (error) => {
      closeLoading()
      Swal.fire({
        title: '通知',
        text: error.responseJSON.message,
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      })
    },
  })
}

// function preventEnter(event) {
//   if (event.key === 'Enter' || event.keyCode === 13) {
//     event.preventDefault()
//   }
// }

// function isNumberKey(evt) {
//   var charCode = evt.which ? evt.which : evt.keyCode
//   return !(charCode > 31 && (charCode < 48 || charCode > 57))
// }

// $(document).on('keyup', 'input', (e) => {
//   e.preventDefault()
//   $('input').removeClass('invalid-field')
//   $('select').removeClass('invalid-field')
//   $('.invalid-message').html('')
// })
