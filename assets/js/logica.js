// Variables globales
let presupuesto = 0; //variable de tipo number se inicializa con el valor 0
let gastos = []; //array vacio ya que se agregan gastos una vez el usuario los ingrese

// Elementos del DOM, Estas variables se utilizan en las funciones del código para actualizar los valores y elementos en el DOM en función de la interacción del usuario
const formPresupuesto = document.getElementById("formPresupuesto");
const cantidadInput = document.getElementById("cantidadInput");
const tablaPresupuesto = document.getElementById("tabla_presupuesto");
const tcontenido = document.getElementById("tcontenido");
const formGasto = document.getElementById("formGasto");
const nombreInput = document.getElementById("nombreInput");
const cantidadGasto = document.getElementById("cantidadGasto");
const tablaGastos = document.getElementById("tabla_principal");

// Función para actualizar la tabla de presupuesto
function actualizarTablaPresupuesto() {
  tablaPresupuesto.innerHTML = `
    <thead>
      <tr>
        <th scope="col">Presupuesto</th>
        <th scope="col">Gastos</th>
        <th scope="col">Saldo</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${presupuesto}</td>
        <td>${sumarGastos()}</td>
        <td>${presupuesto - sumarGastos()}</td>
      </tr>
    </tbody>
  `;
}

// Función para actualizar la tabla de gastos
function actualizarTablaGastos() {
  tablaGastos.innerHTML = `
    <thead>
      <tr>
        <th scope="col">Gasto</th>
        <th scope="col">Valor</th>
      </tr>
    </thead>
    <tbody>
      ${gastos.map(gasto => `
        <tr>
          <td>${gasto.nombre}</td>
          <td>${gasto.cantidad}</td>
        </tr>
      `).join('')}
    </tbody>
  `;
}

// Función para sumar los gastos
function sumarGastos() {
  return gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
}

// Función para obtener el presupuesto
function inputPresupuesto() {
  presupuesto = parseFloat(cantidadInput.value);
  actualizarTablaPresupuesto();
}

// Función para agregar un gasto
function inputGasto() {
  const nombre = nombreInput.value;
  const cantidad = parseFloat(cantidadGasto.value);
  gastos.push({nombre, cantidad});
  actualizarTablaGastos();
  actualizarTablaPresupuesto();
  nombreInput.value = '';
  cantidadGasto.value = '';
}

// variable return para evitar que la pagina se recargue al enviar el formulario
formPresupuesto.addEventListener('submit', () => {
  inputPresupuesto();
  return false;
});

formGasto.addEventListener('submit', () => {
  inputGasto();
  return false;
});


// funcion para borrar Gastos 

function actualizarTablaGastos() {
  tablaGastos.innerHTML = `
    <thead>
      <tr>
        <th scope="col">Gasto</th>
        <th scope="col">Valor</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      ${gastos.map((gasto, index) => `
        <tr>
          <td>${gasto.nombre}</td>
          <td>${gasto.cantidad}</td>
          <td><a href="#" onclick="eliminarGasto(${index})"><i class="bi bi-trash3"></i></a></td>
        </tr>
      `).join('')}
    </tbody>
  `;
}

function eliminarGasto(index) {
  gastos = gastos.filter((gasto, i) => i !== index);
  actualizarTablaGastos();
  actualizarTablaPresupuesto();
}

