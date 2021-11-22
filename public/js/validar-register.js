window.addEventListener("load", function(){
    
    // Capturo elementos
    let form = document.querySelector("form");
    let userName = document.getElementById("userName");
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");    
    let street = document.getElementById("street");
    let number = document.getElementById("number");
    let city = document.getElementById("city");
    let state = document.getElementById("state");
    let cp = document.getElementById("cp");
    let phone_number = document.getElementById("phone_number");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");


    const acceptedExtensions = ['jpg', 'png', 'gif', 'jpeg', 'JPG', 'PNG', 'GIF', 'JPEG'];

    // Eventos
    form.addEventListener('submit', function(e){
        //e.preventDefault();
        //alert("entre aca!")
        //alert(rol)

        let hasErrors = {
            userName: userNameValidator(),
            firstName: nameValidator(),
            lastName: lastNameValidator(),            
            street: streetValidator(),
            number: numberValidator(),
            city: cityValidator(),
            state: stateValidator(),
            cp: cpValidator(),
            phone_number: phone_numberValidator(),
            password: passwordValidator(),
            confirmPassword: confirmPassword(),

        }


        // Si hay errores, prevengo la accion por defecto
        if ( hasErrors.firstName || hasErrors.lastName || hasErrors.userName || hasErrors.email || hasErrors.street || hasErrors.number || hasErrors.city || hasErrors.cp || hasErrors.phone_number || hasErrors.state || hasErrors.password || hasErrors.confirmPassword
            ) e.preventDefault();
    });

    // Llamo a las funciones
    userName.addEventListener('blur', userNameValidator);
    firstName.addEventListener('blur', nameValidator);
    lastName.addEventListener('blur', lastNameValidator);    
    street.addEventListener('blur', streetValidator);
    number.addEventListener('blur', numberValidator);
    city.addEventListener('blur', cityValidator);
    state.addEventListener('blur', stateValidator);
    cp.addEventListener('blur', cpValidator);
    phone_number.addEventListener('blur', phone_numberValidator);
    email.addEventListener('blur', emailValidator);
    password.addEventListener('blur', passwordValidator);
    confirmPassword.addEventListener('blur', confirmPasswordValidator);
 
    // Escribe el mensaje
    writeMsg = ( ...arrToWrite ) => {
        arrToWrite.forEach( elemToWrite => {
            document.getElementById(elemToWrite.id).innerText = elemToWrite.msg;
        });
    }

    // Funciones 

    function userNameValidator () {
        let id = 'userName_error';
        if (userName.value == '' || userName.value == null) {
            writeMsg( { id, msg: 'El usuario no puede estar vacío' } );
            userName.classList.add('is-invalid');
            return true
        } else if (userName.value.length < 2) {
            writeMsg( { id, msg: 'El usuario debe tener al menos 2 caracteres' } );
            userName.classList.add('is-invalid');
            return true
        }
        writeMsg( { id, msg: '' } );
        userName.classList.remove('is-invalid');
        return false
    } 

    function nameValidator () {
        let id = 'firstName_error';
        if (firstName.value == '' || firstName.value == null) {
            writeMsg( { id, msg: 'El nombre no puede estar vacío' } );
            firstName.classList.add('is-invalid');
            return true
        } else if (firstName.value.length < 2) {
            writeMsg( { id, msg: 'El nombre debe tener al menos 2 caracteres' } );
            firstName.classList.add('is-invalid');
            return true
        }
        writeMsg( { id, msg: '' } );
        firstName.classList.remove('is-invalid');
        return false
    }

    function lastNameValidator () {
        let id = 'lastName_error';
        if (lastName.value == '' || lastName.value == null) {
            writeMsg( { id, msg: 'El apellido no puede estar vacío' } );
            lastName.classList.add('is-invalid');
            return true
        } else if (lastName.value.length < 2) {
            writeMsg( { id, msg: 'El apellido debe tener al menos 2 caracteres' } );
            lastName.classList.add('is-invalid');
            return true
        }
        writeMsg( { id, msg: '' } );
        lastName.classList.remove('is-invalid');
        return false
    }

    
    function emailValidator () {
        let id = 'email_error';
        let regexEmail = /^([A-Za-z0-9_\-\+\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        if (email.value == '' || email.value == null) {
            writeMsg( { id, msg: 'El email no puede estar vacío' } );
            email.classList.add('is-invalid');
            return true
        } else if (!email.value.match(regexEmail)) {
            writeMsg( { id, msg: 'El email debe ser valido' } );
            email.classList.add('is-invalid');
            return true
        }
        writeMsg( { id, msg: '' } );
        email.classList.remove('is-invalid');
        return false
    }

    function streetValidator () {
        let id = 'street_error';
        if (street.value == '' || street.value == null) {
            writeMsg( { id, msg: 'Este campo no puede estar vacío' } );
            street.classList.add('is-invalid');
            return true
        } 
        writeMsg( { id, msg: '' } );
        street.classList.remove('is-invalid');
        return false
    }

    function numberValidator () {
        let id = 'number_error';
        if (number.value == '' || number.value == null) {
            writeMsg( { id, msg: 'Este campo no puede estar vacío' } );
            number.classList.add('is-invalid');
            return true
        } 
        writeMsg( { id, msg: '' } );
        number.classList.remove('is-invalid');
        return false
    }

    function cityValidator () {
        let id = 'city_error';
        if (city.value == '' || city.value == null) {
            writeMsg( { id, msg: 'Este campo no puede estar vacío' } );
            city.classList.add('is-invalid');
            return true
        } 
        writeMsg( { id, msg: '' } );
        city.classList.remove('is-invalid');
        return false
    }

    function stateValidator () {
        let id = 'state_error';
        if (state.value == '' || state.value == null) {
            writeMsg( { id, msg: 'Este campo no puede estar vacío' } );
            state.classList.add('is-invalid');
            return true
        } 
        writeMsg( { id, msg: '' } );
        state.classList.remove('is-invalid');
        return false
    }

    function cpValidator () {
        let id = 'cp_error';
        if (cp.value == '' || cp.value == null) {
            writeMsg( { id, msg: 'Este campo no puede estar vacío' } );
            cp.classList.add('is-invalid');
            return true
        } 
        writeMsg( { id, msg: '' } );
        cp.classList.remove('is-invalid');
        return false
    }

    function phone_numberValidator () {
        let id = 'phone_number_error';
        if (phone_number.value == '' || phone_number.value == null) {
            writeMsg( { id, msg: 'Este campo no puede estar vacío' } );
            phone_number.classList.add('is-invalid');
            return true
        } 
        writeMsg( { id, msg: '' } );
        phone_number.classList.remove('is-invalid');
        return false
    }

    function passwordValidator () {
        let id = 'password_error';
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
        if (password.value == '' || password.value == null) {
            writeMsg( { id, msg: 'La contraseña no puede estar vacía' } );
            password.classList.add('is-invalid');
            return true
        } else if (!password.value.match(strongRegex)) {
            writeMsg( { id, msg: 'La contraseña debe tener al menos una minúscula, una mayúscula, un número y un caracter especial' } );
            password.classList.add('is-invalid');
            return true
        } else if (password.value.length < 8 || password.value.length > 11) {
            writeMsg( { id, msg: 'La contraseña debe tener entre 8 y 11 caracteres' } );
            password.classList.add('is-invalid');
            return true
        }
        writeMsg( { id, msg: '' } );
        password.classList.remove('is-invalid');
        return false
    }

    function confirmPasswordValidator () {
        let id = 'repassword_error';
        if (confirmPassword.value == '' || confirmPassword.value == null) {
            writeMsg( { id, msg: 'Este campo no puede estar vacío' } );
            confirmPassword.classList.add('is-invalid');
            return true
        } else if (confirmPassword.value !== password.value) {
            writeMsg( { id, msg: 'Las contraseñas no coinciden' } );
            confirmPassword.classList.add('is-invalid');
            return true
        }
        writeMsg( { id, msg: '' } );
        confirmPassword.classList.remove('is-invalid');
        return false
    }

   
})