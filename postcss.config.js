const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const cssnext = require('postcss-cssnext');
const nested = require('postcss-nested');
const simplevars = require('postcss-simple-vars');
const discardComments = require('postcss-discard-comments');

module.exports = {
  plugins: [
    simplevars(),
    nested(),
    cssnext({ warnForDuplicates: false }),
    autoprefixer(),
    discardComments({ removeAll: true }),
    cssnano(),
  ],
};
