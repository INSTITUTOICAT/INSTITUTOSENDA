// Mobile Menu Toggle
function toggleMenu() {
  const menu = document.getElementById("mobileMenu")
  menu.classList.toggle("active")
}

// Carrera Details Modal
function showCarreraDetails(tipo) {
  const modal = document.getElementById("carreraModal")
  const contadorDetails = document.getElementById("contadorDetails")
  const biologicasDetails = document.getElementById("biologicasDetails")

  modal.classList.add("active")

  if (tipo === "contador") {
    contadorDetails.classList.add("active")
    biologicasDetails.classList.remove("active")
  } else {
    biologicasDetails.classList.add("active")
    contadorDetails.classList.remove("active")
  }
}

function closeModal() {
  const modal = document.getElementById("carreraModal")
  modal.classList.remove("active")
}

function goToInscripcion() {
  closeModal()
  location.href = "#inscripcion"
}

// Close modal when clicking outside
document.getElementById("carreraModal")?.addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal()
  }
})

// Form Data Storage
let formData = {}

// Inscripción Form Handler
document.getElementById("inscripcionForm")?.addEventListener("submit", (e) => {
  e.preventDefault()

  // Store form data
  formData = {
    nombre: document.getElementById("nombreAlumno").value,
    grado: document.getElementById("grado").value,
    grupo: document.getElementById("grupo").value,
    edad: document.getElementById("edad").value,
    fechaNacimiento: document.getElementById("fechaNacimiento").value,
    lugarNacimiento: document.getElementById("lugarNacimiento").value,
    nacionalidad: document.getElementById("nacionalidad").value,
    domicilio: document.getElementById("domicilio").value,
    alergias: document.getElementById("alergias").value || "Ninguna",
    tipoSangre: document.getElementById("tipoSangre").value,
    nombreMadre: document.getElementById("nombreMadre").value,
    telefonoMadre: document.getElementById("telefonoMadre").value,
    ocupacionMadre: document.getElementById("ocupacionMadre").value,
    nombrePadre: document.getElementById("nombrePadre").value,
    telefonoPadre: document.getElementById("telefonoPadre").value,
    ocupacionPadre: document.getElementById("ocupacionPadre").value,
    observaciones: document.getElementById("observaciones").value,
  }

  // Show success message
  alert("¡Inscripción exitosa! Ahora puedes generar tu carné en la sección de Carné.")

  // Redirect to carné section
  location.href = "#carne"
})

// Photo Preview for Carné
function previewPhoto(event) {
  const file = event.target.files[0]
  if (!file) return

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    alert("La imagen es demasiado grande. Por favor selecciona una imagen menor a 5MB.")
    return
  }

  // Validate file type
  if (!file.type.startsWith("image/")) {
    alert("Por favor selecciona un archivo de imagen válido.")
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    const photoPreview = document.getElementById("carnePhotoPreview")
    photoPreview.src = e.target.result

    // Show carné preview
    generateCarne()
  }
  reader.readAsDataURL(file)
}

// Generate Carné
function generateCarne() {
  const preview = document.getElementById("carnePreview")
  const success = document.getElementById("carneSuccess")

  // Check if form data exists
  if (!formData.nombre) {
    alert("Por favor completa el formulario de inscripción primero.")
    location.href = "#inscripcion"
    return
  }

  // Populate carné with form data
  document.getElementById("carneNombre").textContent = formData.nombre.toUpperCase()
  document.getElementById("carneEdad").textContent = formData.edad
  document.getElementById("carneGrado").textContent = formData.grado

  // Format date
  const fecha = new Date(formData.fechaNacimiento)
  const fechaFormateada = `${fecha.getDate().toString().padStart(2, "0")}/${(fecha.getMonth() + 1).toString().padStart(2, "0")}/${fecha.getFullYear()}`
  document.getElementById("carneFecha").textContent = fechaFormateada

  document.getElementById("carneAlergias").textContent = formData.alergias
  document.getElementById("carneMadre").textContent = formData.nombreMadre
  document.getElementById("carnePadre").textContent = formData.nombrePadre
  document.getElementById("carneTelefono").textContent = formData.telefonoMadre

  // Generate random ID
  const randomID = Math.floor(100000 + Math.random() * 900000)
  document.getElementById("carneID").textContent = randomID

  // Show preview
  preview.style.display = "block"
  success.style.display = "none"
}

// Download Carné (simplified version - shows success message)
function downloadCarne() {
  const success = document.getElementById("carneSuccess")
  const preview = document.getElementById("carnePreview")

  // In a real implementation, you would use html2canvas or similar library
  // to convert the carné to an image and download it

  preview.style.display = "none"
  success.style.display = "block"

  // Scroll to success message
  success.scrollIntoView({ behavior: "smooth" })
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})
