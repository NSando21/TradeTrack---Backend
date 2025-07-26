import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { FileUpLoadRepository } from './file.upload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryConfig, FileUpLoadRepository],
  exports: [FileUpLoadRepository],
})
export class FileUploadModule {}
