//MODAL

const overlay = document.querySelector('#overlayForModal'),
  modal = document.querySelector('.modal'),
  cross = document.querySelector('.modal__cross'),
  buttonOpen = document.querySelectorAll('.open-modal');

const modalToggle = () => {
  overlay.classList.toggle('show-overlay')
  modal.classList.toggle('show-modal')
}

const handlerOverlay = ({
  target
}) => {
  const targetCl = target.classList
  if (targetCl.contains('open-modal')) {
    modalToggle()
  } else if (targetCl.contains('overlay')) {
    modalToggle()
  }

}

buttonOpen.forEach(btn => {
  btn.addEventListener('click', handlerOverlay)
})

cross.addEventListener('click', modalToggle)
overlay.addEventListener('click', handlerOverlay)



//drawer

const drawer = document.querySelector('.drawer')
const burger = document.querySelector('#burger')
const drawerBtn = document.querySelector('.drawer__btn')
const drawerCross = document.querySelector('.drawer__cross')
const overlayForDrawer = document.querySelector('#overlayForDrawer')
const openModalInDrawer = document.querySelector('#openModalInDrawer')


const drawerToggle = () => {
  overlayForDrawer.classList.toggle('show-overlay')
  drawer.classList.toggle('show-drawer')
}

const closeDrawer = async () => {
  drawer.classList.add('close-drawer')
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      overlayForDrawer.classList.remove('show-overlay')
      drawer.classList.remove('show-drawer', 'close-drawer')
    }, 400)
  });
  await clearTimeout()

}

const closeDrawerOpenModal = async () => {
  drawer.classList.add('close-drawer')
  await new Promise((resolve, reject) => {
      setTimeout(() => {
        overlayForDrawer.classList.remove('show-overlay')
        drawer.classList.remove('show-drawer', 'close-drawer')
        resolve(true)
      }, 400)
    })
    .then((res) => {
      modalToggle()
    })
}

burger.addEventListener('click', drawerToggle)
drawerCross.addEventListener('click', closeDrawer)
// openModalInDrawer.addEventListener('click', closeDrawerOpenModal)

const links = document.querySelector('.drawer__ul')


links.addEventListener('click', () => {
  closeDrawer()
})

//MASK

window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;

    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});