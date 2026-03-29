# ☕ JavaVerse OS: Interactive Full-Stack Ecosystem

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

**JavaVerse OS** no es una simple web; es un entorno de ejecución distribuido diseñado para la enseñanza interactiva y el análisis de código en tiempo real. Este proyecto integra una arquitectura de microservicios donde cada lenguaje cumple un rol crítico en el ciclo de vida del software.

---

## 🚀 Arquitectura del Sistema

El proyecto se divide en tres capas principales interconectadas mediante APIs REST y WebSockets:

### 1. 🏗️ Core Backend (Java)
El "músculo" del sistema. Encargado de la seguridad, persistencia y el motor de ejecución.
* **Tecnologías:** Spring Boot, JUnit, Maven.
* **Funcionalidad:** Orquestación de peticiones y aislamiento de procesos para ejecutar código Java de forma segura (Sandboxing).

### 2. 🧠 AI Intelligence Layer (Python)
El "cerebro" analítico. Procesa el código fuente antes de la compilación.
* **Tecnologías:** FastAPI, Pandas, Scikit-learn.
* **Funcionalidad:** Análisis de complejidad ciclomática, sugerencias de refactorización y explicación de errores mediante procesamiento de lenguaje natural (NLP).

### 3. 🖥️ Interface & UX (JS, HTML, CSS)
La "cara" del proyecto. Una Single Page Application (SPA) con estética de sistema operativo.
* **Tecnologías:** React/Vanilla JS, GSAP (animaciones), AOS, CSS Grid & Flexbox.
* **Funcionalidad:** Terminal interactivo, visualización de métricas en tiempo real y diseño *responsive* con efectos de Glassmorphism.

---

## 🛠️ Instalación y Despliegue

Gracias a la contenedorización con **Docker**, puedes levantar todo el ecosistema con un solo comando:

```bash
# Clonar el repositorio
git clone [https://github.com/TU_USUARIO/javaverse-os.git](https://github.com/TU_USUARIO/javaverse-os.git)

# Entrar al directorio
cd javaverse-os

# Levantar todos los microservicios
docker-compose up --build

