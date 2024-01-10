/**
 * Category Handle
 */

// //* List / Delete
// loadList(`${appUrl}/admin/category/list?page=1`)
// $(document).on('input propertychange', '#search #name', (event) => {
//   event.preventDefault()
//   loadList(false)
// })
// $(document).on('click', '#index .pagination li a', (event) => {
//   event.preventDefault()
//   const element = $(event.currentTarget)
//   const pageUrl = element.attr('href')
//   loadList(pageUrl)
// })
// function loadList(pageUrl = false) {
//   const tbody = $('#index table tbody')
//   if (pageUrl == false) {
//     pageUrl = `${appUrl}/admin/category/list`
//   }
//   $.ajax({
//     type: 'GET',
//     url: pageUrl,
//     dataType: 'json',
//     data: {
//       name: $('#index #search #name').val(),
//     },
//     beforeSend: () => {
//       tbody.empty()
//       $('#index .pagination').closest('.card-footer').hide()
//       tbody.html('<tr><td colspan="3" class="text-center"><i class="fas fa-spinner fa-spin"></i></td></tr>')
//     },
//     success: (response) => {
//       let html = ''
//       response.items.forEach((item) => {
//         html += `<tr id="${item.id}">
//             <td><b>${item.name}</b></td>
//             <td>${item.created_at}</td>
//             <td class="project-actions text-right">
//               <a class="btn btn-info btn-sm btn-edit" href="${appUrl}/admin/category/edit/${item.id}" data-name="${item.name}">
//                 <i class="fas fa-pencil-alt text-xs mr-1"></i>${response.messageJapan.btnEdit}
//               </a>
//               <a class="btn btn-danger btn-sm btn-delete" href="${appUrl}/admin/category/destroy/${item.id}">
//                 <i class="fas fa-trash text-xs mr-1"></i>${response.messageJapan.btnDelete}
//               </a>
//             </td>
//           </tr>`
//         // item.childrens.forEach((child) => {
//         //   html += `<tr>
//         //     <td><span class="ml-2">--|${child.name}</span></td>
//         //     <td>${item.created_at}</td>
//         //     <td class="project-actions text-right">
//         //       <a class="btn btn-info btn-sm" href="${appUrl}/admin/category/edit/${child.id}">
//         //         <i class="fas fa-pencil-alt text-xs mr-1"></i>${response.messageJapan.btnEdit}
//         //       </a>
//         //       <a class="btn btn-danger btn-sm btn-delete" href="${appUrl}/admin/category/destroy/${child.id}">
//         //         <i class="fas fa-trash text-xs mr-1"></i>${response.messageJapan.btnDelete}
//         //       </a>
//         //     </td>
//         //   </tr>`
//         // })
//       })
//       const pagination = response.pages.map((page) => {
//         const activePage = response.currentPage === page.number ? 'active' : ''
//         return `<li class="page-item ${activePage}"><a class="page-link" href="${response.path}${page.number}">${page.number}</a></li>`
//       })
//       $('#index .pagination').html(pagination).closest('.card-footer').show()
//       tbody.html(html)
//     },
//     error: (error) => {
//       $('#index .pagination').closest('.card-footer').hide()
//       tbody.html('<tr><td colspan="3" class="text-center">見つからないデータ</td></tr>')
//     },
//   })
// }
// // Create
// $(document).on('submit', '#create-modal #create', (event) => {
//   event.preventDefault()
//   const form = $(event.currentTarget)
//   const modal = $('#create-modal')
//   modal.find('.is-invalid').removeClass('is-invalid')
//   $.ajax({
//     url: form.attr('action'),
//     type: form.attr('method'),
//     dataType: 'json',
//     data: form.serialize(),
//     beforeSend: () => {
//       loadingStart(modal.find('.modal-content'))
//     },
//     success: async (response) => {
//       loadingStop(modal.find('.modal-content'))
//       modal.find('input').val('')
//       await Swal.fire({
//         title: response.title,
//         text: response.message,
//         icon: 'success',
//         showConfirmButton: false,
//         timer: 1500,
//       })
//       loadList((page_url = false))
//     },
//     error: (error) => {
//       loadingStop(modal.find('.modal-content'))
//       if (error.status === 422) {
//         $.each(error.responseJSON.errors, (key, item) => {
//           modal.find(`#${item.param}`).addClass('is-invalid')
//           notification('error', item.msg)
//         })
//         modal.find(`#${error.responseJSON.errors[0].param}`).trigger('focus')
//       } else {
//         Swal.fire({
//           title: '通知',
//           text: error.responseJSON.message,
//           icon: 'error',
//           showConfirmButton: false,
//           timer: 1500,
//         })
//       }
//     },
//   })
// })
// // Edit
// $(document).on('click', '#index table .project-actions .btn-edit', (event) => {
//   event.preventDefault()
//   const modal = $('#edit-modal')
//   const element = $(event.currentTarget)
//   const url = element.attr('href')
//   const name = element.attr('data-name')
//   modal.find('#edit').attr('action', url)
//   modal.find('#editName').val(name)
//   modal.modal('show')
// })
// $('#edit-modal').on('hidden.bs.modal', (e) => {
//   const modal = $('#edit-modal')
//   modal.find('#edit').attr('action', '')
//   modal.find('#editName').val('')
// })
// $(document).on('submit', '#edit-modal #edit', (event) => {
//   event.preventDefault()
//   const form = $(event.currentTarget)
//   const modal = $('#edit-modal')
//   modal.find('.is-invalid').removeClass('is-invalid')
//   $.ajax({
//     url: form.attr('action'),
//     type: form.attr('method'),
//     dataType: 'json',
//     data: form.serialize(),
//     beforeSend: () => {
//       loadingStart(modal.find('.modal-content'))
//     },
//     success: async (response) => {
//       loadingStop(modal.find('.modal-content'))
//       await Swal.fire({
//         title: response.title,
//         text: response.message,
//         icon: 'success',
//         showConfirmButton: false,
//         timer: 1500,
//       })
//       $(`tr#${response.item.id} td:first-child b`).text(response.item.name)
//       $(`tr#${response.item.id} .project-actions .btn-edit`).attr('data-name', response.item.name)
//       modal.modal('hide')
//     },
//     error: (error) => {
//       loadingStop(modal.find('.modal-content'))
//       if (error.status === 422) {
//         $.each(error.responseJSON.errors, (key, item) => {
//           modal.find(`#${item.param}`).addClass('is-invalid')
//           notification('error', item.msg)
//         })
//         modal.find(`#${error.responseJSON.errors[0].param}`).trigger('focus')
//       } else {
//         Swal.fire({
//           title: '通知',
//           text: error.responseJSON.message,
//           icon: 'error',
//           showConfirmButton: false,
//           timer: 1500,
//         })
//       }
//     },
//   })
// })
// // Delete
// $(document).on('click', '#index table .project-actions .btn-delete', (event) => {
//   event.preventDefault()
//   const element = $(event.currentTarget)
//   const url = element.attr('href')
//   const currentUrl = window.location.href
//   Swal.fire({
//     title: '本当に削除しますか？',
//     text: 'これを元に戻すことはできません!',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonText: 'はい',
//     cancelButtonText: 'キャンセル',
//     allowOutsideClick: false,
//   }).then((confirm) => {
//     if (confirm.isConfirmed) {
//       $.ajax({
//         url,
//         type: 'DELETE',
//         dataType: 'json',
//         data: {},
//         success: async (response) => {
//           await Swal.fire({
//             title: response.title,
//             text: response.message,
//             icon: 'success',
//             showConfirmButton: false,
//             timer: 1500,
//           })
//           window.location.href = currentUrl
//         },
//         error: (error) => {
//           Swal.fire({
//             title: '通知',
//             text: error.responseJSON.message,
//             icon: 'error',
//             showConfirmButton: false,
//             timer: 1500,
//           })
//         },
//       })
//     }
//   })
// })

function displayTranslate(className) {
  $(`.${className}`).removeClass('d-none')
}

// Menu sidebar active
$('#global_nav #accordion li#menu_categories')
  .addClass('is-active')
  .parents('li.dropdown-parent')
  .addClass('menu-open')
  .removeClass('not-show')
  .find('button i.fa-solid')
  .removeClass('fa-angle-down')
  .addClass('fa-angle-up')
