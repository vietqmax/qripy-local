$(function () {
  // モーダルウィンドウ
  $('.js-modalOpen').on('click', function () {
    var target = $(this).data('target')
    var modal = document.getElementById(target)
    $(modal).fadeIn()
    $('body').addClass('overflow-hidden')
    $('.modal-custom').addClass('ani-fade-up')
    return false
  })
  $('.js-modalClose').on('click', function () {
    $('.js-modalCnt').fadeOut()
    $('body').removeClass('overflow-hidden')
    $('.modal-custom').removeClass('ani-fade-up')
    return false
  })
})

$(function () {
  $('.js-modalbell').on('click', function () {
    var target = $(this).data('target')
    var modal = document.getElementById(target)
    $(modal).fadeIn()
    return false
  })
  $('.js-modalClose').on('click', function () {
    $('.js-modalCnt').fadeOut()
    $('body').removeClass('overflow-hidden')
    return false
  })
  $('button.cancel-btn').on('click', function () {
    $('.js-modalCnt').fadeOut()
    $('body').removeClass('overflow-hidden')
    return false
  })
})
$(function () {
  // モーダルウィンドウ
  $('.js-modalsuccess').on('click', function () {
    var target = $(this).data('target')
    var modal = document.getElementById(target)
    $(modal).fadeIn()
    return false
  })
  $('.js-modalClose').on('click', function () {
    $('.js-modalCnt').fadeOut()
    $('body').removeClass('overflow-hidden')
    return false
  })
})

$(function () {
  // 「.modal_open」をクリックしたらモーダルと黒い背景を表示する
  $('.modal_open').click(function () {
    // 黒い背景をbody内に追加
    $('body').append('<div class="modal_bg"></div>')
    $('.modal_bg').fadeIn()

    // data-targetの内容をIDにしてmodalに代入
    var modal = '#' + $(this).attr('data-target')

    // モーダルをウィンドウの中央に配置する
    function modalResize() {}

    // modalResizeを実行
    modalResize()

    // modalをフェードインで表示
    $(modal).fadeIn()

    // .modal_bgか.modal_closeをクリックしたらモーダルと背景をフェードアウトさせる
    $('.modal_bg, .modal_close,.js-modalClose')
      .off()
      .click(function () {
        $('.modal_box').fadeOut()
        $('.modal_bg').fadeOut('slow', function () {
          $('.modal_bg').remove()
        })
      })

    // ウィンドウがリサイズされたらモーダルの位置を再計算する
    $(window).on('resize', function () {
      modalResize()
    })

    // .modal_switchを押すとモーダルを切り替える
    $('.modal_switch').click(function () {
      // 押された.modal_switchの親要素の.modal_boxをフェードアウトさせる
      $(this).parents('.modal_box').fadeOut()

      // 押された.modal_switchのdata-targetの内容をIDにしてmodalに代入
      var modal = '#' + $(this).attr('data-target')

      // モーダルをウィンドウの中央に配置する
      function modalResize() {}

      // modalResizeを実行
      modalResize()

      $(modal).fadeIn()

      // ウィンドウがリサイズされたらモーダルの位置を再計算する
      $(window).on('resize', function () {
        modalResize()
      })
    })
  })

  // $(document).mouseup(function (e) {
  //   var containerModal = $('.modal__wrap')
  //   // if the target of the click isn't the container nor a descendant of the container
  //   if (!containerModal.is(e.target) && containerModal.has(e.target).length === 0) {
  //     $('.js-modalCnt').fadeOut()
  //     $('body').removeClass('overflow-hidden')
  //     $('.modal-custom').removeClass('ani-fade-up')
  //   }
  // })
})
