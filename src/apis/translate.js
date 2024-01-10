const axios = require('axios')
const i18n = require('i18n')

const googleTranslates = async (text, source, targetArr) => {
  // const targetArr = ['en', 'ja', 'ko'];
  const translations = {}
  try {
    let error = 0
    for (target of targetArr) {
      const response = await axios({
        method: 'GET',
        url: `https://script.google.com/macros/s/AKfycbwsXFBD2bwOCA2FKKJctKX08Upyxs-SDlPQT0bvukX_EjqYpYr-ldQK-GC-0vma52w/exec?text=${text}&source=${source}&target=${target}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      // Check if response is undefined
      if (response.data.code !== 200) {
        error++
      }
      // Assuming the response contains the translated text
      const translatedText = response.data.text
      translations[target] = translatedText
    }
    if (error > 0) {
      return { status: false, message: 'An error occurred during translation API' }
    }
    return { status: true, data: translations }
  } catch (err) {
    return { status: false, message: 'An error occurred during translation API' }
  }
}
/* Use */
// try {
//   const translated = await googleTranslates(text, source, targetArr)
//   console.log('Translated to English:', translated.en)
//   console.log('Translated to Japanese:', translated.ja)
//   console.log('Translated to Korean:', translated.ko)
// } catch (error) {
//   // Handle any overarching translation error here
//   console.error('Translation process failed:', error.message)
// }

module.exports = {
  googleTranslates,
}
