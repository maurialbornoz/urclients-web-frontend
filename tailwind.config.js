const colors = require('tailwindcss/colors')

module.exports = {
    theme: {
        extend: {
            colors: {
                stone: colors.warmGray,
                sky: colors.lightBlue,
                neutral: colors.trueGray,
                gray: colors.coolGray,
                slate: colors.blueGray,
            }
        }
    }
}