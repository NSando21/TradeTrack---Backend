// src/types/express.d.ts
import "multer";

declare global {
  namespace Express {
    namespace Multer {
      interface File {
        // Puedes extender esto si necesitas propiedades adicionales del archivo
        // que Multer te proporciona, como 'path', 'filename', etc.
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination: string;
        filename: string;
        path: string;
        buffer: Buffer;
      }
    }
  }
}
