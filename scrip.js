// Proyecto 1: Contador Inteligente
let contador = localStorage.getItem('contador') ? parseInt(localStorage.getItem('contador')) : 0;

function actualizarContador() {
    const display = document.getElementById('contador-display');
    display.innerText = contador;
    display.style.color = contador > 0 ? 'green' : contador < 0 ? 'red' : 'gray';
    localStorage.setItem('contador', contador);
}

function incrementar() {
    contador++;
    actualizarContador();
}

function decrementar() {
    contador--;
    actualizarContador();
}

function reiniciar() {
    contador = 0;
    actualizarContador();
}

actualizarContador();

// Proyecto 2: Lista de Tareas
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

function mostrarTareas() {
    const lista = document.getElementById('tareas-lista');
    lista.innerHTML = '';
    tareas.forEach((tarea, index) => {
        const li = document.createElement('li');
        li.innerText = tarea.text;
        li.style.textDecoration = tarea.completada ? 'line-through' : 'none';
        li.onclick = () => {
            tarea.completada = !tarea.completada;
            mostrarTareas();
            localStorage.setItem('tareas', JSON.stringify(tareas));
        };
        const btnEliminar = document.createElement('button');
        btnEliminar.innerText = 'Eliminar';
        btnEliminar.onclick = (e) => {
            e.stopPropagation();
            tareas.splice(index, 1);
            mostrarTareas();
            localStorage.setItem('tareas', JSON.stringify(tareas));
        };
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
}

function agregarTarea() {
    const input = document.getElementById('tarea-input');
    if (input.value) {
        tareas.push({ text: input.value, completada: false });
        input.value = '';
        mostrarTareas();
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
}

mostrarTareas();

// Proyecto 3: Adivina el Número
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;

function adivinar() {
    const input = document.getElementById('numero-input');
    const resultado = document.getElementById('resultado-adivinanza');
    intentos++;
    const numeroUsuario = parseInt(input.value);
    if (numeroUsuario < numeroSecreto) {
        resultado.innerText = "Muy bajo";
    } else if (numeroUsuario > numeroSecreto) {
        resultado.innerText = "Muy alto";
    } else {
        resultado.innerText = `¡Correcto! Intentos: ${intentos}`;
    }
}

// Proyecto 4: Calculadora Básica
let operacion = '';
let resultado = '';

function agregarNumero(num) {
    resultado += num.toString();
    document.getElementById('calculadora-display').value = resultado;
}

function operar(op) {
    operacion = op;
    resultado += ' ' + op + ' ';
    document.getElementById('calculadora-display').value = resultado;
}

function calcular() {
    try {
        const res = eval(resultado);
        document.getElementById('calculadora-display').value = res;
        resultado = res.toString();
    } catch (error) {
        document.getElementById('calculadora-display').value = 'Error';
    }
}

function borrar() {
    resultado = '';
    document.getElementById('calculadora-display').value = resultado;
}

// Proyecto 5: Cambiador de Colores Aleatorios
let colorOriginalClaro = '#ffffff'; // Color original claro
let colorOriginalOscuro = '#121212'; // Color original oscuro
let colorOriginal = colorOriginalClaro; // Color original inicial

function cambiarColor() {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = color;
    document.getElementById('color-codigo').innerText = color;
}

function restablecerColor() {
    // Verificar si el modo oscuro está activo
    if (document.body.classList.contains('modo-oscuro')) {
        document.body.style.backgroundColor = colorOriginalOscuro; // Restablecer al color original oscuro
    } else {
        document.body.style.backgroundColor = colorOriginalClaro; // Restablecer al color original claro
    }
    document.getElementById('color-codigo').innerText = document.body.style.backgroundColor; // Mostrar el color restablecido
}

// Proyecto 6: Temporizador
let temporizador;
let tiempoRestante;

function actualizarTemporizador() {
    const display = document.getElementById('temporizador-display');
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;
    display.innerText = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
}

function iniciarTemporizador() {
    const minutosInput = document.getElementById('minutos').value;
    const segundosInput = document.getElementById('segundos').value;
    tiempoRestante = parseInt(minutosInput) * 60 + parseInt(segundosInput);
    actualizarTemporizador();
    temporizador = setInterval(() => {
        if (tiempoRestante > 0) {
            tiempoRestante--;
            actualizarTemporizador();
        } else {
            clearInterval(temporizador);
            alert("¡Tiempo terminado!");
        }
    }, 1000);
}

function pausarTemporizador() {
    clearInterval(temporizador);
}

function reiniciarTemporizador() {
    clearInterval(temporizador);
    tiempoRestante = 0;
    document.getElementById('minutos').value = '';
    document.getElementById('segundos').value = '';
    document.getElementById('temporizador-display').innerText = '';
}

// Proyecto 7: Generador de Contraseñas
function generarContrasena() {
    const longitud = document.getElementById('longitud').value;
    const mayusculas = document.getElementById('mayusculas').checked;
    const minusculas = document.getElementById('minusculas').checked;
    const numeros = document.getElementById('numeros').checked;
    const simbolos = document.getElementById('simbolos').checked;

    let caracteres = '';
    if (mayusculas) caracteres += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (minusculas) caracteres += 'abcdefghijklmnopqrstuvwxyz';
    if (numeros) caracteres += '0123456789';
    if (simbolos) caracteres += '!@#$%^&*()_+[]{}|;:,.<>?';

    let contrasena = '';
    for (let i = 0; i < longitud; i++) {
        contrasena += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    document.getElementById('contrasena-display').innerText = contrasena;
}

// Proyecto 8: Modo Oscuro / Claro
function toggleModo() {
    document.body.classList.toggle('modo-oscuro'); // Alternar la clase para el modo oscuro
    // Restablecer el color de fondo al original del modo actual
    restablecerColor(); // Llamar a la función para restablecer el color
}


// Proyecto 9: Piedra, Papel o Tijera
let puntosUsuario = 0;
let puntosComputadora = 0;

function jugar(eleccion) {
    const opciones = ['piedra', 'papel', 'tijera'];
    const computadora = opciones[Math.floor(Math.random() * 3)];
    let resultado = '';
    
    if (eleccion === computadora) {
        resultado = "Empate!";
    } else if (
        (eleccion === 'piedra' && computadora === 'tijera') ||
        (eleccion === 'papel' && computadora === 'piedra') ||
        (eleccion === 'tijera' && computadora === 'papel')
    ) {
        resultado = "¡Ganaste!";
        puntosUsuario++;
    } else {
        resultado = "Perdiste!";
        puntosComputadora++;
    }

    document.getElementById('resultado-juego').innerText = `Usuario: ${puntosUsuario} - Computadora: ${puntosComputadora} (${resultado})`;
}

function reiniciarJuego() {
    puntosUsuario = 0;
    puntosComputadora = 0;
    document.getElementById('resultado-juego').innerText = 'Usuario: 0 - Computadora: 0';
}

// Proyecto 10: Galería de Imágenes
const imagenes = [
    { url: 'https://i.pinimg.com/736x/f1/e0/13/f1e013c85c89df4f2c7fe4ed1b4f8465.jpg', categoria: 'Animales' },
    { url: 'https://i.pinimg.com/736x/0b/1e/1d/0b1e1dfa6a93149a2277f400a97e3ce8.jpg', categoria: 'Animales' },
    { url: 'https://i.pinimg.com/736x/d5/5f/fc/d55ffc0c8af3eb9c8527d80f045312d6.jpg', categoria: 'Animales' },
    { url: 'https://i.pinimg.com/1200x/00/6d/7f/006d7f439286ea2183fbbe7243644846.jpg', categoria: 'Animales' },
    { url: 'https://i.pinimg.com/736x/a6/32/23/a63223f44234fb46eac1173ad92de723.jpg', categoria: 'Juegos' },
    { url: 'https://i.pinimg.com/736x/4c/33/93/4c3393933d0b563b5d66a824318716e0.jpg', categoria: 'Juegos' },
    { url: 'https://i.pinimg.com/1200x/ec/b2/ee/ecb2eeacfbded82215f70134fc8b4041.jpg', categoria: 'Juegos' },
    { url: 'https://i.pinimg.com/736x/46/7c/9e/467c9e72911aca6cf7b73ff089b9ed62.jpg', categoria: 'Naturaleza' },
    { url: 'https://i.pinimg.com/736x/ba/50/59/ba50592ac6df7b407bc8742ccb666a0a.jpg', categoria: 'Naturaleza' },
    { url: 'https://i.pinimg.com/736x/f7/33/67/f73367a146cb79cb383b34dbf91f1128.jpg', categoria: 'Naturaleza' },
    // Agrega más imágenes según sea necesario
];

function mostrarImagenes(filtro) {
    const grid = document.getElementById('imagenes-grid');
    grid.innerHTML = '';
    const imagenesFiltradas = filtro ? imagenes.filter(img => img.categoria.toLowerCase().includes(filtro.toLowerCase())) : imagenes;
    
    imagenesFiltradas.forEach(imagen => {
        const imgElement = document.createElement('img');
        imgElement.src = imagen.url;
        imgElement.alt = imagen.categoria;
        imgElement.onclick = () => abrirModal(imagen.url, imagen.categoria);
        grid.appendChild(imgElement);
    });
}

function abrirModal(url, categoria) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    modalImage.src = url;
    modalImage.alt = categoria;
    modalCaption.textContent = categoria;
    modal.classList.remove('hidden');
}

function cerrarModal(event) {
    if (event) {
        event.stopPropagation();
    }
    const modal = document.getElementById('image-modal');
    modal.classList.add('hidden');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        cerrarModal();
    }
});

document.getElementById('buscador').addEventListener('input', (e) => {
    const textoBuscado = e.target.value;
    mostrarImagenes(textoBuscado);
});

mostrarImagenes();

// Función para mostrar y ocultar secciones
function mostrarSeccion(id) {
    const secciones = document.querySelectorAll('.proyecto');
    secciones.forEach(seccion => {
        seccion.style.display = 'none'; // Ocultar todas las secciones
    });
    document.getElementById(id).style.display = 'block'; // Mostrar la sección seleccionada

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('href') === '#' + id);
    });
}