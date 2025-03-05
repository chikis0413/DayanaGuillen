// API URL
const apiUrl = "https://rickandmortyapi.com/api/character/";

// Obtener el grid donde mostrar los personajes
const characterGrid = document.getElementById("character-grid");

// Modal de detalles
const modal = document.getElementById("character-modal");
const closeModal = document.getElementById("close-modal");
const modalName = document.getElementById("modal-name");
const modalImage = document.getElementById("modal-image");
const modalLocation = document.getElementById("modal-location");
const modalOrigin = document.getElementById("modal-origin");

// Función para obtener personajes de la API
async function fetchCharacters() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const characters = data.results;

    // Mostrar los personajes en el grid
    characters.forEach(character => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h3>${character.name}</h3>
      `;

      // Al hacer clic en la card, abrir el modal
      card.addEventListener("click", () => showModal(character));

      characterGrid.appendChild(card);
    });
  } catch (error) {
    console.error("Error al obtener personajes:", error);
  }
}

// Función para mostrar el modal con detalles del personaje
function showModal(character) {
  modal.style.display = "flex";
  modalName.textContent = character.name;
  modalImage.src = character.image;
  modalLocation.textContent = character.location.name;
  modalOrigin.textContent = character.origin.name;
}

// Función para cerrar el modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar modal cuando se haga clic fuera de la ventana del modal
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Llamada inicial para cargar los personajes al cargar la página
fetchCharacters();
