const moment = require('moment-timezone')
const multer = require('multer')

const dateTime = (string, format, timezone) =>
  moment(moment.utc(string).toISOString())
    .tz(timezone ? timezone : 'Asia/Tokyo')
    .format(format)

const generatorCode = (lenght = 10) => {
  const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', lenght)
  return nanoid()
}

const groupValidation = (errors, res) => {
  const groupedErrors = {}
  // Iterate through the validation errors
  errors.forEach((error) => {
    const { param, msg, value, location } = error
    // Extract the base parameter without language suffix
    const baseParam = param.replace(/\.[a-z]+$/, '')
    // Create or update the grouped object
    if (!groupedErrors[baseParam]) {
      groupedErrors[baseParam] = {
        value: '',
        msg: `${res.__(msg.i18nLabel)} ${res.__(msg.i18nMessage)}`,
        param: baseParam,
        location,
      }
    }
    // // Update value if it's empty or undefined
    // if (!groupedErrors[baseParam].value || groupedErrors[baseParam].value === undefined) {
    //   groupedErrors[baseParam].value = value
    // }
  })

  // Convert the grouped object back to an array
  const groupedErrorsArray = Object.values(groupedErrors)

  return groupedErrorsArray
}

const translateValidation = (errors, res) => {
  const translateErrors = errors.map(async (error) => {
    return {
      param: error?.param,
      msg: `${res.__(error.msg.i18nLabel)} ${res.__(error.msg.i18nMessage)}`,
      value: error?.value,
      location: error?.location,
    }
  })

  return Promise.all(translateErrors)
}

const messageJapan = {
  /**
   * DEFAULT MESSAGE
   * Do not delete the content below. Only update
   */

  // App Title
  appTitle: '彗星ブッククラブ',

  // Login
  titleLogin: 'ログイン',
  usernameLogin: 'ユーザー名',
  passwordLogin: 'パスワード',
  errorLogin: '間違ったユーザー名またはパスワード',
  errorLoginDelete: 'アカウントが削除されました',
  errorLoginLocked: 'アカウントがロックされました',
  errorLoginIncorrect: '間違ったユーザー名またはパスワード',

  // Message
  denyAccess: 'アクセスが拒否されました',
  createSuccess: '新規作成に成功',
  createCommentSuccess: '投稿が完了しました',
  createFail: '新規作成に失敗しました',
  updateSuccess: '更新に成功',
  updateFail: 'アップデートに失敗しました',
  delSuccess: '正常に削除',
  delBookFailed: 'この本は使用中のため削除できません。',
  delFail: '削除に失敗しました',
  notification: '通知',
  dataNotFound: '何もデータが見つかりませんでした',
  alreadyExist: 'すでに存在しています',
  totalRows: '件です。',
  mailSettingSuccess: 'メール通知設定を変更しました。',
  changePasswordSuccess: 'パスワードを変更しました。',
  cancelSubSuccess: '無事に退会が完了しました。',
  sentContactSuccess: 'メッセージは正常に送信されました。',
  sentCommentSuccess: 'コメントは正常に送信されました。',
  deleteCommentSuccess: 'コメントが正常に削除されました。',
  enterMessageError: 'メッセージ内容を入力してください。',
  notFoundBookClubJoined: '現在予約している読書会はありません。',
  notFoundPurchased: '購入履歴はありません。',
  notFoundBoard: 'まだ掲示板は追加されていません。',
  notFoundBookClubHeld: 'まだ開催された読書会はありません。',
  notFoundBookClubPending: '今後の読書クラブはまだありません。',
  notFoundNotice: 'まだ発表はありません。',
  notFoundMemberJoinedBookClub: 'このクラブにはまだメンバーが参加していません。',

  // Button text
  btnCreateNew: '新規作成',
  btnCreate: '登録する',
  btnEdit: '編集',
  btnDelete: '削除',
  btnSearch: '検索',
  btnReset: 'クリア',
  btnBack: '戻る',
  btnCancel: 'キャンセル',
  btnClose: 'Close',
  btnDetail: '詳細',

  /**
   * CUSTOM
   * If adding new, please write here
   */
  chooseImg: '画像を選択',
  btnImport: '補充',
  btnHistory: '履歴',
  textHistory: '在庫変動履歴',

  // Cart
  addToCartSuccess: 'カートに正常に追加されました。',
  removeCartItemSuccess: '正常に削除されました。',
  requireLoginToAddCart: 'ログインしてください。',
}

const messageValidation = {
  required: 'は空のままにしないでください',
  number: 'フィールドには数字のみを含める必要があります',
  string: 'フィールドには英字のみを含めることができます',
  empty: 'は空のままにしないでください',
  email: 'フィールドには有効なメールアドレスが含まれている必要があります',
  alphanum: 'フィールドには英数字のみを含めることができます',
  dataUri: 'フィールドには有効なURLが含まれている必要があります',
  length: 'フィールドの長さは正確に 文字である必要があります',
  max: 'フィールドの長さは 文字を超えることはできません',
  min: 'フィールドの長さは少なくとも 文字である必要があります',
  existed: 'すでに存在しています',
  notExisted: '存在しなかった',
  emailMatch: '電子メールは一致する必要があります',
  match: 'パスワードが一致している必要があります',
  unauthenticated: '間違ったユーザー名またはパスワード',
  password: '間違ったパスワード',
  currentPasswordNotMatch: '現在のパスワードが間違っています。',
  vimeoValidate: 'Vimeo URL が無効です',
  vimeoLimitVideo: '「解説動画」には最大3つの動画しか追加できません。',
  emailNotFound: 'メールアドレスが存在しません',
}
// Upload Img
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/public/uploads')
  },

  filename: (req, file, cb) => {
    cb(null, encodeURI(file.originalname))
  },
})

const imgFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type, only JPG, JPEG and PNG is allowed!'), false)
  }
}

const upload = multer({
  imgFilter,
  limits: {
    fileSize: 1024 * 1024 * 50, // 10 MB (max file size)
  },
  storage: multerStorage,
})

module.exports = {
  dateTime,
  groupValidation,
  translateValidation,
  generatorCode,
  messageJapan,
  messageValidation,
  upload,
}
