import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import presupuestoPagosRoutes from "./routes/presupuestoPagosRoutes";
import GenerarReporteRoutes from "./routes/GenerarReporteRoutes";

// Configurar variables de entorno
dotenv.config();



// Crear aplicación
const app = express();
// Definir los tipos de archivos permitidos (imágenes y PDF)
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf/;
  const mimeType = allowedTypes.test(file.mimetype);

  if (mimeType) {
    cb(null, true); // Aceptar el archivo
  } else {
    cb(new Error("Tipo de archivo no permitido. Solo imágenes y PDFs."), false); // Rechazar el archivo
  }
};

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registrar rutas
//app.use("/api/proveedores", presupuestoPagosRoutes);
app.use("/api/presupuesto-pagos", presupuestoPagosRoutes);
app.use("/api/GenerarReporte", GenerarReporteRoutes);

// Imprimir rutas registradas en el servidor
console.log("Rutas registradas en el servidor:");
const getRoutes = (layer: any, basePath = "") => {
  if (layer.route) {
    // Si es una ruta directa, mostrar el path
    console.log(`- ${basePath}${layer.route.path}`);
  } else if (layer.name === "router" && layer.handle.stack) {
    // Si es un router con subrutas
    layer.handle.stack.forEach((subLayer: any) => {
      let cleanedPath = layer.regexp.source
        .replace(/^\^/, "") // Eliminar el `^` del inicio
        .replace(/\\\//g, "/") // Reemplazar `\/` por `/`
        .replace(/\(\?=\/\|\$\)/, "") // Eliminar `(?=\/|$)`
        .replace(/\?\//g, "/") // Eliminar `?/` extra
        .replace(/\/\?$/, ""); // Eliminar `/?` del final

      getRoutes(subLayer, basePath + cleanedPath);
    });
  }
};



app._router.stack.forEach((middleware: any) => {
  getRoutes(middleware);
});


// Middleware de manejo de errores global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Middleware de error global:", err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

export default app;


