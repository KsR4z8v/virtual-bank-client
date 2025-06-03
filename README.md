# AppBank Client

Este proyecto es una aplicación web construida utilizando **React** y **Vite** como herramienta de construcción. A continuación se describen los pasos necesarios para instalar y ejecutar el proyecto en tu entorno local.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado en tu sistema:

- [Node.js](https://nodejs.org/) (versión 16 o superior recomendada).
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/) como gestor de paquetes.

Puedes verificar si están instalados ejecutando los siguientes comandos:

```bash
node -v
npm -v
```

## Instalación

1. **Clona este repositorio**:

   ```bash
   git clone https://github.com/KsR4z8v/virtual-bank-client.git
   ```

2. **Accede al directorio del proyecto**:

   ```bash
   cd virtual-bank-client
   ```

3. **Instala las dependencias**:

   Si usas `npm`:
   
   ```bash
   npm install
   ```
   
   O si prefieres `yarn`:
   
   ```bash
   yarn install
   ```

## Ejecución en modo desarrollo

Para iniciar la aplicación en modo desarrollo, ejecuta:

Si usas `npm`:

```bash
npm run dev
```

O si usas `yarn`:

```bash
yarn dev
```

Esto iniciará un servidor de desarrollo y podrás acceder a la aplicación en tu navegador en la dirección [http://localhost:4000](http://localhost:4000)

## Scripts disponibles

En el archivo `package.json` se incluyen los siguientes scripts:

- `dev`: Inicia el servidor de desarrollo.
- `build`: Genera una versión optimizada para producción.
- `preview`: Previsualiza la versión construida para producción.

## Generar versión de producción

Para construir una versión optimizada de la aplicación para producción, ejecuta:

Si usas `npm`:

```bash
npm run build
```

O si usas `yarn`:

```bash
yarn build
```

Los archivos generados estarán en el directorio `dist`.

## Previsualizar la versión de producción

Para previsualizar la versión construida para producción, ejecuta:

Si usas `npm`:

```bash
npm run preview
```

O si usas `yarn`:

```bash
yarn preview
```

Esto iniciará un servidor para previsualizar la aplicación construida en el navegador.

## Tecnologías utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de desarrollo rápida y ligera para aplicaciones modernas de JavaScript.
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.


