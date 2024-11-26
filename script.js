// Clase para crear perros
class Perro {
    constructor(nombre, edad, raza, historia, foto) {
        this.nombre = nombre;
        this.edad = edad;
        this.raza = raza;
        this.historia = historia;
        this.foto = foto;
        this.fechaAdopcion = new Date().toLocaleDateString();
    }
}

// Arreglo para almacenar perros
let perros = [];

// Evento para el formulario
document.getElementById('form-perro').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    const raza = document.getElementById('raza').value;
    const historia = document.getElementById('historia').value;
    const fotoInput = document.getElementById('foto');

    // Validar que se haya seleccionado una imagen
    if (fotoInput.files.length === 0) {
        alert('Por favor, selecciona una foto para el perro');
        return;
    }

    // Leer la imagen como URL
    const reader = new FileReader();
    reader.onload = function(event) {
        const foto = event.target.result;

        // Crear nuevo perro
        const nuevoPerro = new Perro(nombre, edad, raza, historia, foto);
        perros.push(nuevoPerro);

        // Crear tarjeta de perro
        crearTarjetaPerro(nuevoPerro);

        // Agregar a la galería
        agregarAGaleria(nuevoPerro);

        // Limpiar formulario
        e.target.reset();
    };

    reader.readAsDataURL(fotoInput.files[0]);
});

function crearTarjetaPerro(perro) {
    const catalogo = document.getElementById('catalogo-perros');
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('tarjeta-perro');

    tarjeta.innerHTML = `
        <img src="${perro.foto}" alt="${perro.nombre}">
        <h3>${perro.nombre}</h3>
        <p><strong>Edad:</strong> ${perro.edad} años</p>
        <p><strong>Raza:</strong> ${perro.raza}</p>
        <p><strong>Historia:</strong> ${perro.historia}</p>
        <p><strong>Fecha de Adopción:</strong> ${perro.fechaAdopcion}</p>
    `;

    catalogo.appendChild(tarjeta);
}

function agregarAGaleria(perro) {
    const galeria = document.getElementById('imagenes-galeria');
    const divImagen = document.createElement('div');
    divImagen.classList.add('imagen-galeria');

    const imagen = document.createElement('img');
    imagen.src = perro.foto;
    imagen.alt = `Foto de ${perro.nombre}`;

    divImagen.appendChild(imagen);
    galeria.appendChild(divImagen);

    // Añadir evento de clic para ampliar imagen
    imagen.addEventListener('click', function() {
        mostrarImagenCompleta(perro.foto, perro.nombre);
    });
}

function mostrarImagenCompleta(urlImagen, nombrePerro) {
    // Crear overlay para mostrar imagen completa
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';

    const imagenCompleta = document.createElement('img');
    imagenCompleta.src = urlImagen;
    imagenCompleta.alt = `Foto de ${nombrePerro}`;
    imagenCompleta.style.maxWidth = '90%';
    imagenCompleta.style.maxHeight = '90%';
    imagenCompleta.style.objectFit = 'contain';

    overlay.appendChild(imagenCompleta);
    document.body.appendChild(overlay);

    // Cerrar overlay al hacer clic
    overlay.addEventListener('click', function() {
        document.body.removeChild(overlay);
    });
}

// Perros de ejemplo precargados
const perrosIniciales = [
    {
        nombre: 'Firulais',
        edad: 3,
        raza: 'Labrador',
        historia: 'Rescatado de la calle, muy cariñoso',
        foto: 'https://i.ibb.co/VvwmJws/00-13-34-los-10-sonidos-principales-del-perro.jpg/300/300'  // Reemplazar con URL de imagen real
    },
    {
        nombre: 'Luna',
        edad: 2,
        raza: 'Pastor Alemán',
        historia: 'Rescate de un refugio, muy juguetona',
        foto: 'https://i.ibb.co/gdnkFs3/00-16-47-images.jpg//301/301'  // Reemplazar con URL de imagen real
    },
    {
        nombre: 'Bombom',
        edad: 7,
        raza: 'Dalmata',
        historia: 'Muy juguetona',
        foto: 'https://i.ibb.co/z57BmTF/00-24-59-images.jpg//301/301'  // Reemplazar con URL de imagen real
    },
    {
        nombre: 'oso',
        edad: 9,
        raza: 'Husky',
        historia: 'Un lobo domesticado',
        foto: 'https://i.ibb.co/q0FbG7H/00-32-18-images.jpg//301/301'  // Reemplazar con URL de imagen real
    }
];

// Cargar perros iniciales
perrosIniciales.forEach(perro => {
    const nuevoPerro = new Perro(
        perro.nombre,
        perro.edad,
        perro.raza,
        perro.historia,
        perro.foto
    );
    perros.push(nuevoPerro);
    crearTarjetaPerro(nuevoPerro);
    agregarAGaleria(nuevoPerro);
});

