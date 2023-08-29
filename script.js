const form = document.getElementById("theForm");
const opTag = document.getElementById("opTag");
const name = document.getElementById('name');
const email = document.getElementById('email');
const submit = document.getElementById('submit');

function submitForm(event) {
   event.preventDefault();
   const data = new FormData(document.getElementById("theForm"));

   fetch("http://localhost:3000", { method: "post", body: data })
   .then(res => {
      if(res.status==400 || res.status==500){
         throw "Something wrong!";
      }

      return res.text();
   })
   .then(txt => {
      console.log(txt)
      form.style.display = "none";
      opTag.innerHTML = `<b>${txt}</b>`;
   })
   .catch(err => {
      console.log(err);
   })

   return false;
}


function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
      setValidity(input, true);
    }else {
      setValidity(input, false);
    }

    validateForm();
}

function checkName(input) {
    const re = /^[a-z ,.'-]+$/i;
    if(re.test(input.value.trim())) {
      setValidity(input, true);
    }else {
      setValidity(input, false);
    }

    validateForm();
}

function validateForm(){
   const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const reName = /^[a-z ,.'-]+$/i;

   const isValid = reName.test(name.value.trim()) && reEmail.test(email.value.trim());
   submit.disabled = !isValid;

   return isValid;
}

function setValidity(input, isValid){
   const color = `${isValid ? '#27ae60' : '#c0392b'} 1px solid`;
   input.style.outline = color;
}

form.addEventListener('submit', submitForm);