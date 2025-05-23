// Variable global para mantener referencia a la fila seleccionada
let selectedRow = null;

document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("product-table-body");

  // Agregar un nuevo producto a la tabla
  document.getElementById("add-btn").addEventListener("click", () => {
    const data = getFormData();
    if (!data) return; // Si falta algún dato, se detiene

    const tr = document.createElement("tr");
    tr.classList.add("product-row");
    fillRowWithData(tr, data);

    // Selecciona la fila al hacer clic
    tr.addEventListener("click", () => selectRow(tr));
    tbody.appendChild(tr);
    clearForm(); // Limpia los campos del formulario
  });

  // Modifica una fila seleccionada
  document.getElementById("edit-btn").addEventListener("click", () => {
    if (!selectedRow) {
      alert("Selecciona una fila para modificar.");
      return;
    }

    const data = getFormData();
    if (!data) return;

    fillRowWithData(selectedRow, data);
    clearForm();
    deselectRow();
  });

  // Eliminar una fila seleccionada
  document.getElementById("delete-btn").addEventListener("click", () => {
    if (!selectedRow) {
      alert("Selecciona una fila para eliminar.");
      return;
    }

    selectedRow.remove();
    clearForm();
    deselectRow();
  });
});

// Validacion de los campos del formulario
function getFormData() {
  const id = document.getElementById("id").value.trim();
  const nombre = document.getElementById("nombre").value.trim();
  const distribuidor = document.getElementById("distribuidor").value.trim();
  const recibido = document.getElementById("recibido").value;
  const vencimiento = document.getElementById("vencimiento").value;
  const cantidad = document.getElementById("cantidad").value;

  if (!id || !nombre || !distribuidor || !recibido || !vencimiento || !cantidad) {
    alert("Por favor completa todos los campos.");
    return null;
  }

  return { id, nombre, distribuidor, recibido, vencimiento, cantidad };
}

// Añade los datos del formulario a la tabla
function fillRowWithData(row, data) {
  row.innerHTML = `
    <td>${data.id}</td>
    <td>${data.nombre}</td>
    <td>${data.distribuidor}</td>
    <td>${data.recibido} / ${data.vencimiento}</td>
    <td>${data.cantidad}</td>
  `;
}

// Limpia todos los campos del formulario luego de agregarlos
function clearForm() {
  document.querySelectorAll("#id, #nombre, #distribuidor, #recibido, #vencimiento, #cantidad").forEach(input => input.value = "");
}

// Selecciona una fila y carga sus datos en el formulario
function selectRow(row) {
  deselectRow();
  selectedRow = row;
  row.classList.add("selected");

  const cells = row.querySelectorAll("td");
  document.getElementById("id").value = cells[0].textContent;
  document.getElementById("nombre").value = cells[1].textContent;
  document.getElementById("distribuidor").value = cells[2].textContent;

  const [recibido, vencimiento] = cells[3].textContent.split(" / ");
  document.getElementById("recibido").value = recibido;
  document.getElementById("vencimiento").value = vencimiento;
  document.getElementById("cantidad").value = cells[4].textContent;
}

// Deselecciona cualquier fila activa
function deselectRow() {
  if (selectedRow) {
    selectedRow.classList.remove("selected");
    selectedRow = null;
  }
}

// Filtra los productos por id, nombre o distribuidor
document.getElementById('searchInput').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  const rows = document.querySelectorAll('.product-row');

  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const id = cells[0]?.textContent.toLowerCase() || '';
    const nombre = cells[1]?.textContent.toLowerCase() || '';
    const distribuidor = cells[2]?.textContent.toLowerCase() || '';

    const match =
      id.includes(searchTerm) ||
      nombre.includes(searchTerm) ||
      distribuidor.includes(searchTerm);

    row.style.display = match ? '' : 'none'; // Muestra u oculta la fila al realizar una busqueda
  });
});

