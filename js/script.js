(function () {
  'use strict';

  function Validation() {
    this.email = document.getElementById('email');
    this.pass1 = document.getElementById('pass1');
    this.pass2 = document.getElementById('pass2');
    this.phone = document.getElementById('phone-number');
    this.checkbox = document.querySelector('input[type="checkbox"]');
    this.submit = document.querySelector('button[type="submit"]');

    this.email.addEventListener('blur', this.emailValidation.bind(this));
    this.pass1.addEventListener('blur', this.passValidation1.bind(this));
    this.pass2.addEventListener('blur', this.passValidation2.bind(this));
    this.phone.addEventListener('blur', this.phoneValidation.bind(this));
    this.checkbox.addEventListener('change', this.checkboxValidation.bind(this));

    this.emailFlag = false;
    this.pass1Flag = false;
    this.pass2Flag = false;
    this.checkFlag = false;
  }

  Validation.prototype.emailValidation = function () {
    var self = this;
    setTimeout(function () {
      var reg = /.+@.+\..+/i;
      var trimed = self.email.value.trim();
      if (trimed.length === 0) {
        self.emailFlag = false;
        self.addErrorMessage('This field is required', self.email);
      }
      else if (!reg.test(trimed)) {
        self.emailFlag = false;
        self.addErrorMessage('Invalid format', self.email);
      }
      else {
        self.emailFlag = true;
        self.email.parentNode.classList.remove('error');
        self.deleteErrorMessage(self.email);
      }
      self.switchSubmitButton();
    }, 300);
  };

  Validation.prototype.passValidation1 = function () {
    var self = this;
    setTimeout(function () {
      var reg = /^[a-zA-Z0-9_]+?$/g;
      var trimed = self.pass1.value.trim();
      if (trimed.length === 0) {
        self.pass1Flag = false;
        self.addErrorMessage('This field is required' , self.pass1);
      }
      else if (!reg.test(trimed)) {
        self.pass1Flag = false;
        self.addErrorMessage('Password contains an unsupported characters', self.pass1);
      }
      else if (trimed.length < 5) {
        self.pass1Flag = false;
        self.addErrorMessage('Password must be at least 5 characters long', self.pass1);
      }
      else {
        self.pass1Flag = true;
        self.pass1.parentNode.classList.remove('error');
        self.deleteErrorMessage(self.pass1);
      }
      self.switchSubmitButton();
    }, 300);
  };

  Validation.prototype.passValidation2 = function () {
    var self = this;
    setTimeout(function() {
      var trimed = self.pass2.value.trim();
      if (trimed.length === 0) {
        self.pass2Flag = false;
        self.addErrorMessage('This field is required' , self.pass2);
      }
      else if (trimed != self.pass1.value.trim()) {
        self.pass2Flag = false;
        self.addErrorMessage('Passwords don\'t match', self.pass2);
      }
      else {
        self.pass2Flag = true;
        self.pass2.parentNode.classList.remove('error');
        self.deleteErrorMessage(self.pass2);
      }
      self.switchSubmitButton();
    }, 300);
  };

  Validation.prototype.phoneValidation = function () {
    var self = this;
    setTimeout(function () {
      var reg = /^\+380\d{9}$/g;
      var trimed = self.phone.value.trim();
      if (trimed.length === 0) {
        self.deleteErrorMessage(self.phone);
        self.phone.parentNode.classList.remove('error');
      }
      else if (!reg.test(trimed)) {
        self.addErrorMessage('Invalid format', self.phone);
      }
      else {
        self.phone.parentNode.classList.remove('error');
        self.deleteErrorMessage(self.phone);
      }
    }, 300);
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
    if (this.emailFlag && this.pass1Flag && this.pass2Flag && this.checkFlag) {
      this.submit.removeAttribute('disabled');
    } else {
      this.submit.setAttribute('disabled', 'disabled');
      }
  };

  var valid = new Validation();

})();
