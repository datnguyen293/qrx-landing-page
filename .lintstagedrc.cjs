module.exports = {
    '*.{js,ts,vue}': 'eslint --fix',
    '*.{ts,js,vue,css,scss,json,md}': ['prettier --write'],
    '*.{vue,css,scss}': ['stylelint --fix'],
};
