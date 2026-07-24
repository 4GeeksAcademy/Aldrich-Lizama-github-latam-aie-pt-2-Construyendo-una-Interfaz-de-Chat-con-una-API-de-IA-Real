# 🚀 Chat Groq AI - Interfaz de Chat con API de IA Real

Aplicación web construida con **Next.js 14**, **TypeScript** y **Tailwind CSS** que proporciona una interfaz de chat interactiva conectada a la **API de Groq** (modelo llama-3.3-70b-versatile).

## 📋 Características

- 💬 Interfaz de chat en tiempo real
- ⚡ Conexión con API de Groq (Llama 3.3 70B)
- 📊 Panel de métricas de tokens (entrada, salida, total, tiempo de respuesta)
- 🎨 Diseño responsive y moderno con Tailwind CSS
- 🌙 Modo oscuro

## 📁 Estructura del Proyecto

```
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root Layout
│   │   ├── page.tsx         # Página principal del Chat
│   │   └── globals.css      # Estilos Tailwind CSS
│   ├── components/
│   │   ├── ChatContainer.tsx # Componente principal del Chat
│   │   ├── MessageList.tsx   # Lista de mensajes renderizada
│   │   ├── MetricsPanel.tsx  # Panel lateral de métricas de tokens
│   │   └── ChatInput.tsx     # Formulario de envío de mensajes
│   └── types/
│       └── chat.ts           # Definición de interfaces TypeScript
├── .env.local                 # Variables de entorno (API Key)
├── .env.example               # Plantilla de variables de entorno
├── package.json               # Dependencias del proyecto
└── README.md                  # Documentación del proyecto
```

## 🛠️ Requisitos Previos

- Node.js 18+
- npm o yarn
- Una API Key de [Groq](https://console.groq.com)

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd <nombre-del-proyecto>
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea el archivo `.env.local` con tu API Key de Groq:
```bash
NEXT_PUBLIC_GROQ_API_KEY=tu_api_key_aqui
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🚀 Uso

1. Escribe un mensaje en el campo de texto
2. Presiona Enter o haz clic en "Enviar"
3. Espera la respuesta de la IA
4. Revisa las métricas de tokens en el panel lateral

## ⚙️ Personalización

Puedes modificar el modelo de IA editando el archivo `ChatContainer.tsx`:

```typescript
model: "llama-3.3-70b-versatile", // Cambia por el modelo deseado
```

## 🐛 Solución de Problemas

- **Error de API Key**: Asegúrate de tener configurada la variable `NEXT_PUBLIC_GROQ_API_KEY` en tu `.env.local`
- **Error de conexión**: Verifica tu conexión a internet y que la API de Groq esté disponible
