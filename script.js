const loginForm = document.getElementById('loginForm');
const crearUsuarioForm = document.getElementById('crearUsuarioForm');
const actualizarUsuarioForm = document.getElementById('actualizarUsuarioForm');
const eliminarUsuarioForm = document.getElementById('eliminarUsuarioForm');
const obtenerUsuariosBtn = document.getElementById('obtenerUsuarios');
const usuariosList = document.getElementById('usuariosList');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('https://api-enfse-1.onrender.com/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Guardar el token en el almacenamiento local
                alert('Inicio de sesión exitoso!');
                window.location.href = 'usuarios.html'; // Redirigir a la página de usuarios
            } else {
                throw new Error('Credenciales incorrectas');
            }
        } catch (error) {
            alert(error.message);
        }
    });
}

if (obtenerUsuariosBtn) {
    obtenerUsuariosBtn.addEventListener('click', async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://api-enfse-1.onrender.com/usuarios', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const usuarios = await response.json();
                usuariosList.innerHTML = ''; // Limpiar la lista antes de llenarla

                usuarios.forEach(usuario => {
                    const li = document.createElement('li');
                    li.textContent = `${usuario.nombre} - ${usuario.email}`;
                    usuariosList.appendChild(li);
                });
            } else {
                throw new Error('Error al obtener usuarios');
            }
        } catch (error) {
            alert(error.message);
        }
    });
}

if (crearUsuarioForm) {
    crearUsuarioForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const emailNuevo = document.getElementById('emailNuevo').value;
        const passwordNuevo = document.getElementById('passwordNuevo').value;
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('https://api-enfse-1.onrender.com/usuarios/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ nombre, email: emailNuevo, password: passwordNuevo })
            });

            if (response.ok) {
                alert('Usuario añadido exitosamente');
                crearUsuarioForm.reset(); // Resetear el formulario
            } else {
                throw new Error('Error al añadir usuario');
            }
        } catch (error) {
            alert(error.message);
        }
    });
}

if (actualizarUsuarioForm) {
    actualizarUsuarioForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const idUsuario = document.getElementById('idUsuarioActualizar').value;
        const nombreActualizar = document.getElementById('nombreActualizar').value;
        const emailActualizar = document.getElementById('emailActualizar').value;
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://api-enfse-1.onrender.com/usuarios/${idUsuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ nombre: nombreActualizar, email: emailActualizar })
            });

            if (response.ok) {
                alert('Usuario actualizado exitosamente');
                actualizarUsuarioForm.reset(); // Resetear el formulario
            } else {
                throw new Error('Error al actualizar usuario');
            }
        } catch (error) {
            alert(error.message);
        }
    });
}

if (eliminarUsuarioForm) {
    eliminarUsuarioForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const idUsuario = document.getElementById('idUsuarioEliminar').value;
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://api-enfse-1.onrender.com/usuarios/${idUsuario}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert('Usuario eliminado exitosamente');
                eliminarUsuarioForm.reset(); // Resetear el formulario
            } else {
                throw new Error('Error al eliminar usuario');
            }
        } catch (error) {
            alert(error.message);
        }
    });
}
