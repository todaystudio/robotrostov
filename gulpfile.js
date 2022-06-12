const { src, dest, parallel, series, watch } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');

function browsersync() {
	browserSync.init({ // Инициализация Browsersync
		server: { baseDir: 'dist/' }, // Указываем папку сервера
		notify: false, // Отключаем уведомления
		online: true // Режим работы: true или false
	})
}

function scripts() {
	return src('src/js/**/*.js')
	.pipe(concat('main.min.js')) // Конкатенируем в один файл
	.pipe(uglify()) // Сжимаем JavaScript
	.pipe(dest('dist/js/')) // Выгружаем готовый файл в папку назначения
	.pipe(browserSync.stream()) // Триггерим Browsersync для обновления страницы
}

function startwatch() {
	watch(['src/**/*.js', '!src/**/*.min.js'], scripts);
	watch('src/scss/**/*.scss', styles);
	watch('src/**/*.html').on('change', () => {
		copyIndex()
	});
	watch('src/img/**/*', images);
}

function styles() {
	return src('src/scss/style.scss') // Выбираем источник: "app/sass/main.sass" или "app/less/main.less"
	.pipe(sass()) // Преобразуем значение переменной "preprocessor" в функцию
	.pipe(concat('style.min.css')) // Конкатенируем в файл app.min.js
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'] })) // Создадим префиксы с помощью Autoprefixer
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
	.pipe(dest('dist/css/')) // Выгрузим результат в папку "app/css/"
	.pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}

function images() {
	return src(['src/img/**/*', 'src/assets/icons/**/*']) // Берем все изображения из папки источника
	// .pipe(newer('dist/img/')) // Проверяем, было ли изменено (сжато) изображение ранее
	// .pipe(imagemin()) // Сжимаем и оптимизируем изображеня
	.pipe(dest('dist/img/')) // Выгружаем оптимизированные изображения в папку назначения
}

function icons() {
	return src('src/icon/**/*') // Берем все изображения из папки источника
	.pipe(dest('dist/icon/')) // Выгружаем оптимизированные изображения в папку назначения
}

function cleanimg() {
	return del('dist/img/**/*', { force: true }) // Удаляем все содержимое папки "app/images/dest/"
}

function copyPages() {
	return src('src/pages/**.html').pipe(dest('dist/pages'))
}

function copyIndex() {
	return src('src/index.html').pipe(dest('dist/'))
}

exports.styles = styles;
exports.cleanimg = cleanimg;
exports.images = images
exports.scripts = scripts
exports.browsersync = browsersync;
exports.html = parallel(copyPages, copyIndex)
exports.default = parallel(scripts, images, icons, browsersync, styles, copyIndex, startwatch);
exports.build = series(scripts, styles, copyPages, copyIndex)