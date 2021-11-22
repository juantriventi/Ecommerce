window.addEventListener("load", function(){

    // Capturar elementos
    
    const form = document.querySelector("form");
    const nombre = document.getElementById("nombre");
    const descripcion = document.getElementById("descripcion");
    const precio = document.getElementById("precio");
    const imagen = document.getElementById("imagen");
    
    const acceptedExtensions = ['JPG', 'jpg', 'png', 'gif', 'jpeg', 'JPEG', 'PNG', 'GIF'];
    
    // Eventos
    form.addEventListener('submit', function (e) {
        let hasErrors = { 
            nombre: nombreValidator(),
            descripcion: descripcionValidator(),
            precio: precioValidator(),           
            imagen: imagenValidator(),
        };
    
    
        if ( hasErrors.nombre || hasErrors.descripcion || hasErrors.precio || hasErrors.imagen 
        ) e.preventDefault();
        
    
    });
    
    nombre.addEventListener('blur', nombreValidator);
    descripcion.addEventListener('blur', descripcionValidator);
    precio.addEventListener('blur', precioValidator);    
    imagen.addEventListener('change', imagenValidator);

    
    
    // Funciones 
    writeMsg = ( ...arrToWrite ) => {
        arrToWrite.forEach( elemToWrite => {
            document.getElementById(elemToWrite.id).innerText = elemToWrite.msg;
        });
    }
    
    function nombreValidator () {
        let id = 'nombre_error';
        if (!nombre.value) {
            writeMsg( { id, msg: 'El nombre no puede estar vacío' } );
            nombre.classList.add('error-input');
            return true
        } else if (nombre.value.length < 5) {
            writeMsg( { id, msg: 'El nombre debe tener al menos 5 caracteres' } );
            nombre.classList.add('error-input');
            return true
        }
        writeMsg( { id, msg: '' } );
        nombre.classList.remove('error-input');
        return false
    }
    
    function descripcionValidator () {
        let id = 'descripcion_error';
        if (!descripcion.value) {
            writeMsg( { id, msg: 'La descripción no puede estar vacía' } );
            descripcion.classList.add('error-input');
            return true
        } else if (descripcion.value.length < 20) {
            writeMsg( { id, msg: 'La descripción debe tener al menos 20 caracteres' } );
            descripcion.classList.add('error-input');
            return true
        }
        writeMsg( { id, msg: '' } );
        descripcion.classList.remove('error-input');
        return false
    }
    
    function precioValidator () {
        let id = 'precio_error';
        if (!precio.value) {
            writeMsg( { id, msg: 'El precio no puede estar vacío' } );
            precio.classList.add('error-input');
            return true
        } else if (isNaN(precio.value)) {
            writeMsg( { id, msg: 'El precio debe ser un numero' } );
            precio.classList.add('error-input');
            return true
        } else if (precio.value <= 0) {
            writeMsg( { id, msg: 'El precio debe ser mayor a 0' } );
            precio.classList.add('error-input');
            return true
        }
        writeMsg( { id, msg: '' } );
        precio.classList.remove('error-input');
        return false
    }
    // imagenes
    function imagenValidator () {
        const imagen = document.getElementById("imagen");
        const imagenError = document.querySelector("#imagen_error");
        let feedback = ''; 
        console.log(imagen);
       console.log("-----------------------");
        if(imagen){
            let filename = imagen.value;
            let fileExtension = filename.split(".").pop();
            if (!acceptedExtensions.includes(fileExtension)) {
                feedback = `Las extenciones de archivo permitidas sonnnnn ${acceptedExtensions.join(', ')}`    
            }
        }
        if (feedback) {
            imagenError.innerText = feedback;
            errors.imagen = feedback;
    
        }else{
            imagenError.innerText = '';   
        }
    
    }

    // fin onload
    })