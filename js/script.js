(function () {
  'use strict';

  function Validation() {
    this.email = document.getElementById('email');
    this.pass1 = document.getElementById('pass1');
    this.pass2 = document.getElementById('pass2');
    this.phone = document.getElementById('phone');
    this.checkbox = document.querySelector('input[type="checkbox"]');
    this.submit = document.querySelector('button[type="submit"]');

    this.email.addEventListener('keyup', this.emailValidation.bind(this));
    this.email.addEventListener('blur', this.emailValidation.bind(this));
    this.pass1.addEventListener('keyup', this.passValidation1.bind(this));
    this.pass1.addEventListener('blur', this.passValidation1.bind(this));
    this.pass2.addEventListener('blur', this.passValidation2.bind(this));
    this.phone.addEventListener('keyup', this.phoneValidation.bind(this));
    this.checkbox.addEventListener('change', this.checkboxValidation.bind(this));

    this.emailFlag = false;
    this.pass1Flag = false;
    this.pass2Flag = false;
    this.phoneFlag = true;
    this.checkFlag = false;
  }

  Validation.prototype.emailValidation = function () {
    this.keyupTimeout = null;
    clearTimeout(this.keyupTimeout);
    var _this = this;
    this.keyupTimeout = setTimeout(function () {
      var reg = /.+@.+\..+/i;
      var trimed = _this.email.value.trim();
      if (trimed.length === 0) {
        _this.emailFlag = false;
        _this.addErrorMessage('Поле обьязательно к заполнению', _this.email);
      }
      else if (!reg.test(trimed)) {
        _this.emailFlag = false;
        _this.addErrorMessage('Неверный формат', _this.email);
      }
      else {
        _this.emailFlag = true;
        _this.email.parentNode.classList.remove('error');
        _this.deleteErrorMessage(_this.email);
      }
      _this.switchSubmitButton();
    }, 500);
  };

  Validation.prototype.passValidation1 = function () {
    this.keyupTimeout = null;
    clearTimeout(this.keyupTimeout);
    var _this = this;
    this.keyupTimeout = setTimeout(function () {
      var reg = /^[a-zA-Z0-9_-]+?$/g;
      var trimed = _this.pass1.value.trim();
      if (trimed.length === 0) {
        _this.pass1Flag = false;
        _this.addErrorMessage('Поле обьязательно к заполнению' , _this.pass1);
      }
      else if (!reg.test(trimed)) {
        _this.pass1Flag = false;
        _this.addErrorMessage('Пароль содержит запрещенные символы', _this.pass1);
      }
      else if (trimed.length <= 5) {
        _this.pass1Flag = false;
        _this.addErrorMessage('Пароль должен быть длинее 5 символов', _this.pass1);
      }
      else {
        _this.pass1Flag = true;
        _this.pass1.parentNode.classList.remove('error');
        _this.deleteErrorMessage(_this.pass1);
      }
      _this.switchSubmitButton();
    }, 500);
  };

  Validation.prototype.passValidation2 = function () {
      var trimed = this.pass2.value.trim();
      if (trimed.length === 0) {
        this.pass2Flag = false;
        this.addErrorMessage('Поле обьязательно к заполнению' , this.pass2);
      }
      else if (trimed != this.pass1.value.trim()) {
        this.pass2Flag = false;
        this.addErrorMessage('Пароли не совпадают', this.pass2);
      }
      else {
        this.pass2Flag = true;
        this.pass2.parentNode.classList.remove('error');
        this.deleteErrorMessage(this.pass2);
      }
      this.switchSubmitButton();
  };

  Validation.prototype.phoneValidation = function () {
    this.keyupTimeout = null;
    clearTimeout(this.keyupTimeout);
    var _this = this;
    this.keyupTimeout = setTimeout(function () {
      var reg = /^\+380\d{9}$/g;
      var trimed = _this.phone.value.trim();
      if (trimed.length === 0) {
        _this.deleteErrorMessage(_this.phone);
        _this.phoneFlag = true;
        _this.switchSubmitButton();
        _this.phone.parentNode.classList.remove('error');
      }
      else if (!reg.test(trimed)) {
        _this.phoneFlag = false;
        _this.addErrorMessage('Не соответствует международному формату', _this.phone);
      }
      else {
        _this.phoneFlag = true;
        _this.phone.parentNode.classList.remove('error');
        _this.deleteErrorMessage(_this.phone);
      }
      _this.switchSubmitButton();
    }, 500);
  };

  Validation.prototype.checkboxValidation = function () {
    this.checkFlag = (this.checkbox.checked) ? true : false;
    this.switchSubmitButton();
  };

  Validation.prototype.addErrorMessage = function (errorText, node) {
    this.deleteErrorMessage(node);
    node.parentNode.classList.add('error');
    var div = document.createElement('div');
    div.classList.add('message');
    var text = document.createTextNode(errorText);
    div.appendChild(text);
    node.parentNode.appendChild(div);
  };

  Validation.prototype.deleteErrorMessage = function (node) {
    node.parentNode.classList.remove('error');
    var message = node.parentNode.querySelector('.message');
    if (message) {
      node.parentNode.removeChild(message);
    }
  };

  Validation.prototype.switchSubmitButton = function () {
    if (this.emailFlag && this.pass1Flag && this.pass2Flag && this.phoneFlag && this.checkFlag) {
      this.submit.removeAttribute('disabled');
    } else {
      this.submit.setAttribute('disabled');
      }
  };

  var valid = new Validation();

})();
