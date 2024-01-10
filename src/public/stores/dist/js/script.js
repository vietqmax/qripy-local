$(function () {
  $(document).ready(function () {
    $('.l-global-nav__menu li.language').on('click', function (event) {
      if ($(window).width() < 1025) {
        event.preventDefault()
        $(this).find('.menu-language').toggleClass('open')
      }
    })

    $('.js-mv, .anime-slidein').addClass('is-active')

    var pagetopBtn = $('#page_top')

    $(window).scroll(function () {
      if ($(this).scrollTop() > 200) {
        pagetopBtn.addClass('is-active')
      } else {
        pagetopBtn.removeClass('is-active')
      }
    })

    $(window).scroll(function () {
      const windowHeight = $(window).height()
      const scroll = $(window).scrollTop()
      $('.anime-slidein, .anime-fadein').each(function () {
        const targetPosition = $(this).offset().top

        // 画面が表示されたとき、または画面内にあるときにis-activeクラスを追加
        if (scroll + windowHeight > targetPosition && scroll < targetPosition + $(this).outerHeight()) {
          $(this).addClass('is-active')
        } else {
          $(this).removeClass('is-active')
        }
      })
    })
  })

  // ハンバーガーメニュー
  $('#toggle_btn').click(function () {
    $(this).toggleClass('is-active')
    $('#global_nav').toggleClass('is-active')
    $('#header_logo img').attr('src', './img/cmn/logo--wh.svg')
  })
  $('#global_nav a[href]').on('click', function (event) {
    $('#toggle_btn').trigger('click')
  })

  // アコーディオン
  $('.js-accordionCnt').hide()
  $('.js-accordionBtn').on('click', function () {
    $(this).next('.js-accordionCnt').slideToggle()
    $(this).toggleClass('is-open')
  })
  //function scroll for category
  function sideScroll(element, direction, speed, distance, step) {
    var scrollAmount = 0
    var slideTimer = setInterval(function () {
      if (direction === 'left') {
        element.scrollLeft -= step
      } else {
        element.scrollLeft += step
      }
      scrollAmount += step
      if (scrollAmount >= distance) {
        clearInterval(slideTimer)
      }
    }, speed)
  }
  let btn = document.querySelectorAll('.slideNext')
  let btnBack = document.querySelectorAll('.slideBack')
  btn.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dataNavValue = btn.getAttribute('data-nav')
      var container = document.getElementById(dataNavValue)
      sideScroll(container, 'right', 25, 100, 10)
    })
  })
  btnBack.forEach(function (btnBack) {
    btnBack.addEventListener('click', function () {
      var dataNavValue = btnBack.getAttribute('data-nav')
      var container = document.getElementById(dataNavValue)
      sideScroll(container, 'left', 25, 100, 10)
    })
  })
  // dropdown navbar in admin screen
  var Accordion = function (el, multiple, link) {
    this.el = el || {}
    this.multiple = multiple || false
    // Variables privadas
    var links = this.el.find(link)
    // Evento
    links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown)
  }

  Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el
    ;($this = $(this)), ($next = $this.next())

    $next.slideToggle()
    $this.parent().toggleClass('not-show')
    var faSolidIcon = $(this).parent().find('.fa-solid')
    if (faSolidIcon.hasClass('fa-angle-down')) {
      faSolidIcon.removeClass('fa-angle-down').addClass('fa-angle-up')
    } else if (faSolidIcon.hasClass('fa-angle-up')) {
      faSolidIcon.removeClass('fa-angle-up').addClass('fa-angle-down')
    }
  }
  var accordion = new Accordion($('#accordion'), false, 'li.dropdown-parent button')

  // dropdown aside
  var AccordionAside = function (el, multiple, link) {
    this.el = el || {}
    this.multiple = multiple || false
    // Variables privadas
    var links = this.el.find(link)
    // Evento
    links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown)
  }

  AccordionAside.prototype.dropdown = function (e) {
    var $el = e.data.el
    ;($this = $(this)), ($next = $this.next())

    $next.slideToggle()
    $this.parent().parent().toggleClass('not-show')
    var faSolidIcon = $(this).parent().find('.fa-solid')
    if (faSolidIcon.hasClass('fa-chevron-down')) {
      faSolidIcon.removeClass('fa-chevron-down').addClass('fa-chevron-up')
    } else if (faSolidIcon.hasClass('fa-chevron-up')) {
      faSolidIcon.removeClass('fa-chevron-up').addClass('fa-chevron-down')
    }
  }

  var accordion = new AccordionAside($('ul#accordion'), false, '.collapse')
  function tabsManagement() {
    $('.tab-chart .nav-link').on('click', function () {
      $('.tab-chart .nav-link').removeClass('active')
      $(this).addClass('active')
      var id = $(this).attr('id')
      var classContent = '.tab-chart .tab-content .tab-item.' + id
      var Img = '.tab-chart .box-img .tab-img#' + id
      console.log(Img)
      $('.tab-chart .tab-content .tab-item').removeClass('active')
      $(classContent).addClass('active')
      $('.tab-chart .box-img .tab-img').removeClass('active')
      $(Img).addClass('active')
    })
  }
  tabsManagement()

  ///dropdown box setting (edit-menu.html)
  $('.setting-dropdown').on('click', function () {
    $(this).parent().find('.box-setting').toggleClass('not-show')
    var faSolidIcon = $(this).find('.fa-solid')
    if (faSolidIcon.hasClass('fa-chevron-down')) {
      faSolidIcon.removeClass('fa-chevron-down').addClass('fa-chevron-up')
    } else if (faSolidIcon.hasClass('fa-chevron-up')) {
      faSolidIcon.removeClass('fa-chevron-up').addClass('fa-chevron-down')
    }
  })

  // ///input file
  // var $fileInput = $('.file-input')
  // var $dropArea = $('.file-drop-area')
  // // highlight drag area
  // $fileInput.on('dragenter focus click', function () {
  //   $dropArea.addClass('is-active')
  // })
  // $fileInput.on('dragleave blur drop', function () {
  //   $dropArea.removeClass('is-active')
  // })
  // // change inner text
  // $fileInput.on('change', function () {
  //   var $textContainer = $(this).prev()
  //   var fileName = $(this).val().split('\\').pop()
  //   $textContainer.text(fileName)
  // })
  $(document).on('click', 'button.option', function (e) {
    if ($(this).parent().find('.box-option').hasClass('show')) {
      $('.box-option').removeClass('show')
    } else {
      $('.box-option').removeClass('show')
      $(this).parent().find('.box-option').addClass('show')
    }
  })

  $(document).mouseup(function (e) {
    var container = $('.box-option')

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) $('.box-option').removeClass('show')
    {
    }
  })
  ///dropdown menu-display
  $('button.box-top  ').click(function () {
    var faSolidIcon = $(this)
    if (faSolidIcon.hasClass('fa-chevron-down')) {
      faSolidIcon.removeClass('fa-chevron-down').addClass('fa-chevron-up')
    } else if (faSolidIcon.hasClass('fa-chevron-up')) {
      faSolidIcon.removeClass('fa-chevron-up').addClass('fa-chevron-down')
    }
    $(this).parent().parent().find('.box-bottom').toggleClass('show')
  })
  // $('.input-images-1').imageUploader({
  //   imagesInputName: 'photos',
  //   extensions: ['.jpg', '.jpeg', '.png', '.gif', '.svg'],
  //   preloadedInputName: 'old',
  //   label: 'Drag & Drop files here or click to browse',
  //   maxSize: 10 * 1024 * 1024,
  //   maxFiles: 10
  // });

  $('body').on('click', '.quantity-container .minus, .quantity-container .plus', function () {
    console.log(1)
    // Cache frequently used jQuery objects
    var qty = $(this).siblings('.quantity').children('.qty')
    var val = parseFloat(qty.val())
    var max = parseFloat(qty.attr('max'))
    var min = parseFloat(qty.attr('min'))
    var step = parseFloat(qty.attr('step'))
    // Check for max and min values, and update quantity
    if ($(this).is('.plus') && (!max || max > val)) {
      qty.val(val + step)
    } else if ($(this).is('.minus') && val > (min || 1)) {
      qty.val(val - step)
    }
  })
})

$(document).ready(function () {
  const $list = $('#main-cate')
  const $prevBtn = $('.slideBack')
  const $nextBtn = $('.slideNext')

  // Kiểm tra khi thay đổi kích thước màn hình
  $(window).on('resize', function () {
    checkListWidth()
  })

  // Kiểm tra chiều dài của danh sách và hiển thị/ẩn các nút khi màn hình nhỏ hơn hoặc bằng 1024px
  function checkListWidth() {
    if ($(window).width() <= 1024) {
      const totalWidth = getTotalListWidth()
      const listWidth = $list.width()

      if (totalWidth > listWidth) {
        $prevBtn.show()
        $nextBtn.show()
      } else {
        $prevBtn.hide()
        $nextBtn.hide()
      }
    } else {
      // Nếu màn hình lớn hơn 1024px, ẩn nút đi
      $prevBtn.hide()
      $nextBtn.hide()
    }
  }

  // Tính tổng chiều dài của các phần tử trong danh sách
  function getTotalListWidth() {
    let totalWidth = 0
    $list.find('li').each(function () {
      totalWidth += $(this).outerWidth(true)
    })
    return totalWidth
  }

  // Gọi hàm kiểm tra chiều dài danh sách khi tải trang
  checkListWidth()
})
