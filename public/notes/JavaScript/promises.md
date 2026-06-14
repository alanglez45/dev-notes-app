# JavaScript Promises

A Promise in JavaScript is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.

A promise may have one of three states:
- **Pending**
- **Fulfilled**
- **Rejected**

A promise starts in a pending state. If the operation is successful, it ends in a fulfilled state. If an error occurs, it ends in a rejected state.

```js
const heroes = [
    {
        id: 1,
        name: 'Batman',
        owner: 'DC'
    },
    {
        id: 2,
        name: 'Spiderman',
        owner: 'Marvel'
    },
    {
        id: 3,
        name: 'Superman',
        owner: 'DC'
    },
    {
        id: 4,
        name: 'Flash',
        owner: 'DC'
    },
    {
        id: 5,
        name: 'Wolverine',
        owner: 'Marvel'
    },
];

const getHeroById = (id) => {
    return heroes.find(hero => hero.id === id);
};

const getHeroeByIdAsync = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const p1 = getHeroById(id);
            if (p1) {
                resolve(p1);
            } else {
                reject('No existe el heroe con ese ID');
            }
        }, 2000);
    });
};

getHeroeByIdAsync(10)
    .then(console.log)
    .catch(console.warn);
```

```js
function obtenerDatosUsuario(idUsuario) {
    return new Promise((resolve, reject) => {
        fetch(`https://jsonplaceholder.typicode.com/users/${idUsuario}`)
            .then((response) => {
                if (!response.ok) {
                    reject('Error al obtener los datos del usuario');
                }
                return response.json();
            })
            .then((datos) => {
                resolve(datos);
            })
            .catch((error) => {
                reject(error.message);
            });
    });
}

function mostrarDatosUsuario(datos) {
    console.log(`Nombre del usuario: ${datos.name}`);
    console.log(`Username: ${datos.username}`);
    console.log(`Email: ${datos.email}`);
    console.log(`Ciudad: ${datos.address.city}`);
}

obtenerDatosUsuario(1)
    .then((datos) => {
        mostrarDatosUsuario(datos);
    })
    .catch((error) => {
        console.error('Error:', error);
    })
    .finally(() => {
        console.log('Operación completada.');
    });
```

## Promise.all

Es un método que te permite ejecutar múltiples promesas en paralelo y esperar a que todas se resuelvan o a que alguna falle.

### Sintaxis

```js
Promise.all([promise1, promise2, promise3, ...])
    .then((results) => {
        // results es un arreglo con los resultados de cada promesa resuelta
    })
    .catch((error) => {
        // Si alguna promesa falla, se ejecuta este bloque
    });
```

### Ejemplo

```js
const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Tarea 1 completada'), 1000);
});
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Tarea 2 completada'), 2000);
});
const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Tarea 3 completada'), 3000);
});

Promise.all([promise1, promise2, promise3])
    .then((results) => {
        console.log('Todas las tareas se completaron:', results);
    })
    .catch((error) => {
        console.log('Algunas tareas fallaron:', error);
    });
```

Output:
```
Todas las tareas se completaron: ['Tarea 1 completada', 'Tarea 2 completada', 'Tarea 3 completada']
```

> NOTA: Si alguna de las promesas es rechazada, Promise.all() detendrá su ejecución y pasará directamente al bloque .catch() con el error de la primera promesa que falló.

### Promise.all con Fetch API

```js
function getPosts(urls) {
    const fetchPromises = urls.map(url =>
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud: ' + response.statusText);
                }
                return response.json();
            })
            .catch(error => {
                console.error(`Error con la URL ${url}:`, error);
                return null;
            })
    );

    return Promise.all(fetchPromises)
        .then(responses => {
            return responses.filter(response => response !== null);
        })
        .catch(error => {
            console.error('Hubo un problema con las solicitudes:', error);
            throw error;
        });
}

const urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2",
    "https://jsonplaceholder.typicode.com/posts/3",
];

getPosts(urls).then((contents) => {
    console.log("posts: ", contents);
});
```

### Promise.all con async/await

```js
async function fetchPosts(urls) {
    try {
        const responses = await Promise.all(urls.map(url =>
            fetch(url).then(response => response.json())
        ));
        console.log("Posts obtenidos con async/await:", responses);
    } catch (error) {
        console.error("Hubo un error:", error);
    }
}

const urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2",
    "https://jsonplaceholder.typicode.com/posts/3",
];
fetchPosts(urls);
```
