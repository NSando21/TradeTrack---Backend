import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileUploadService } from "./file-upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("File Upload")
@Controller("files")
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post("/uploadImage/:id")
  @UseInterceptors(FileInterceptor("file"))
  @ApiOperation({ summary: "Subir imagen de perfil" })
  @ApiConsumes("multipart/form-data")
  @ApiParam({ name: "id", type: String, description: "ID del usuario" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  uploadUserImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 900000,
            message: "tu archivo es demasiado grande",
          }),
          new FileTypeValidator({
            fileType: /^image\/(jpeg|png|bmp|webp|svg\+xml)$/i,
          }),
        ],
      }),
    )
    file: Express.Multer.File,

    @Param("id") id: string,
  ) {
    return this.fileUploadService.uploadImage(file, id);
  }
}
