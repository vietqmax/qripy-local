/**
 * Auth Handle
 */
$(document).on('submit', '#auth', (event) => {
  event.preventDefault()
  const form = $(event.currentTarget)
  $('.is-invalid').removeClass('is-invalid')
  $.ajax({
    url: form.attr('action'),
    type: form.attr('method'),
    dataType: 'json',
    data: form.serialize(),
    beforeSend: () => {
      $('#submit-login-button').attr('disabled', true)
    },
    success: async (result) => {
      window.location.href = `${appUrl}/admin/store`
    },
    error: (error) => {
      $('#submit-login-button').attr('disabled', false)
      if (error.status === 422) {
        $.each(error.responseJSON.messages, (key, item) => {
          $(`#${item.param}`).addClass('is-invalid')
          notification('error', item.msg)
        })
        $(`#${error.responseJSON.errors[0].param}`).trigger('focus')
      } else {
        notification('error', error.responseJSON.message)
      }
    },
    finally: () => {},
  })
})
