(function(){
    const formulario = document.querySelector('#formulario');
    const button = document.querySelector('#button');
    
    formulario.addEventListener('submit', validarForm);
    function validarForm(e){
        e.preventDefault();
        const nombre = document.querySelector('#nombre');
        const email = document.querySelector('#email');
        const personas = document.querySelector('#personas');
        const fecha = document.querySelector('#fecha');
        const hora = document.querySelector('#hora');
        const inputs = [nombre, email, personas, fecha, hora];
        let pass = true;

        inputs.forEach(e => {
            const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
            const input = e.name.split('').map((e,i) => i === 0 ? e.toUpperCase() : e).join('');
            if(e.value.trim() === ''){
                mostrarAlerta(`${input} no puede ir vacio`, 'error', e.id);
                pass = false;
            }else if(e.id === 'email' && !regex.test(e.value)){
                mostrarAlerta(`Ingrese un email valido`, 'error', e.id);
                pass = false;
            }else if(e.id === 'fecha'){
                verificaFecha(e.value, e.id);
            }else if(e.id === 'hora'){
                if(fecha.value != '' ){
                    verificaHora(e.value, e.id)
                }
            }
        });

        if(pass){
            formulario.reset();
            button.value = 'Enviando...'
            setTimeout(() => {
                button.value = 'Enviar'
                mostrarAlerta('Mensaje enviado Correctamente','',formulario.lastElementChild.id); 
            }, 3000);
        }
    }

    function verificaFecha(fechaInput, selector){
        const date = new Date(), fecha = fechaInput.split('-');
        if(fecha[0] < date.getFullYear() && fecha[1] < date.getMonth() + 1 && fecha[2] < date.getDate()){
            mostrarAlerta('El año, el mes y el día ya pasaron','error',selector);
            pass = false;
        }else if(fecha[0] < date.getFullYear() && fecha[1] < date.getMonth() + 1){
            mostrarAlerta('El año y el mes ya pasaron','error',selector);
            pass = false;
        }else if(fecha[0] < date.getFullYear()){
            mostrarAlerta('El año ya paso','error',selector);
            pass = false;
        }else if(fecha[0] >= date.getFullYear() && fecha[1] < date.getMonth() + 1 && fecha[2] < date.getDate()){
            mostrarAlerta('El mes y el día ya pasaron','error',selector);
            pass = false;
        }else if(fecha[0] >= date.getFullYear() && fecha[1] < date.getMonth() + 1){
            mostrarAlerta('El mes ya paso','error',selector);
            pass = false;
        }else if(fecha[0] >= date.getFullYear() && fecha[1] >= date.getMonth() + 1 && fecha[2] < date.getDate()){
            mostrarAlerta('El día ya paso','error',selector);
            pass = false;
        }
    }

    function verificaHora(time, selector){
        const date = new Date();
        const fechaInput = fecha.value.split('-');
        if((fechaInput[0] == date.getFullYear()) && (fechaInput[1] == date.getMonth() +1) && (fechaInput[2] == date.getDate())){
            const horaInput = time.split(':')
            if(horaInput[0] == date.getHours() && horaInput[1] == date.getMinutes()){
                mostrarAlerta('Seleccione otra hora', 'error',selector);
                pass = false;
            }else if(horaInput[0] == date.getHours() && horaInput[1] < date.getMinutes()){
                mostrarAlerta('Esa hora ya paso', 'error',selector);
                pass = false;
            }else if(horaInput[0] < date.getHours()){
                mostrarAlerta('Esa hora ya paso', 'error',selector);
                pass = false;
            }
        }
    }

    function mostrarAlerta(mensaje, tipo, selector){
        const div = document.querySelector(`#${selector}`).parentElement;
        const pRepetido = div.querySelector('.mensaje');
        const parrrafo = document.createElement('P');

        pRepetido ? pRepetido.remove() : '';
        parrrafo.classList.add('mensaje');
        parrrafo.textContent = mensaje;
        parrrafo.style.fontWeight = 'Bold';
        parrrafo.style.marginBlock = '.5rem';
        tipo === 'error' ? parrrafo.style.color = 'Red' : (parrrafo.style.color = 'Green', parrrafo.style.textAlign = 'center');
        div.appendChild(parrrafo);

        setTimeout(() => {
            parrrafo.remove();
        }, 3000);
    }
})();