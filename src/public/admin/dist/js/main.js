/* eslint-disable block-scoped-var */
/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/**
 * Toast Alert
 */
function notification(type, message) {
  let status = 'bg-danger'
  if (type === 'success') {
    status = 'bg-success'
  }
  $(document).Toasts('create', {
    title: '通知',
    class: status,
    autohide: true,
    delay: 5000,
    body: message,
  })
}

/**
 * Loading
 */
const loadingStart = function (element) {
  $(element).append(`<div class="overlay"><i class="fas fa-spinner fa-2x fa-spin"></i></div>`)
}

const loadingStop = function (element) {
  $(element).find('.overlay').remove()
}

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
      $(self).attr('data-btn-text', $(self).html())
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
 * Upload Img
 */
function uploadImg(route = false, wrap = 'body .card', inputName = 'img', event) {
  const img = $(event)
  const imgData = img.prop('files')[0]
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
      loadingStart(wrap)
    },
    success: async (response) => {
      loadingStop(wrap)
      const parent = img.closest('.imgWrap')
      parent.find('.imgUrl').val(response.key)
      parent.find('.imgElement').html(`<img class="img" src="${response.path}">`)
      parent.closest('.imgBox').find('.imgDel').remove()
      parent.closest('.imgBox').append('<span class="imgDel" onclick="delImg(this)"><i class="fas fa-times"></i></span>')
    },
    error: (error) => {
      loadingStop(wrap)
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

function delImg(img) {
  const parent = $(img).closest('.imgBox')
  parent.find('.imgElement').html('<b>画像を選択</b>')
  parent.find('.imgUrl').attr('value', '')
  $(img).remove()
}

function preventEnter(event) {
  if (event.key === 'Enter' || event.keyCode === 13) {
    event.preventDefault()
  }
}

function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode
  return !(charCode > 31 && (charCode < 48 || charCode > 57))
}

$(document).on('keyup', 'input', (e) => {
  e.preventDefault()
  $('input').removeClass('invalid-field')
  $('select').removeClass('invalid-field')
  $('.invalid-message').html('')
})

const loader = '<span><i class="fa-duotone fa-spinner-third fa-spin fa-xl"></i></span> データのロード'

let blockLoader = (element, message = 'データのロード...', overlay = 0.7) => {
  $(element).block({
    message: `<span><i class="fa-duotone fa-spinner-third fa-spin fa-xl"></i></span> ${message}`,
    css: {
      backgroundColor: 'transparent',
      color: '#000',
      border: '0',
      radius: '100px',
    },
    overlayCSS: {
      backgroundColor: '#fff',
      opacity: overlay,
    },
  })
}

let unBlockLoader = (element) => {
  $(element).unblock()
}
