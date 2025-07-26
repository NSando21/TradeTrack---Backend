import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileUpLoadRepository } from './file.upload.repository';
import { User } from '../users/user.entity';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly fileUpLoadRepository: FileUpLoadRepository,
  ) {}

  async uploadImage(file: Express.Multer.File, Id: any) {
    const user = await this.usersRepository.findOneBy({ id: Id });

    if (!user) {
      throw new NotFoundException('Usuario no fue encontrado');
    }

    const uploadResponse = await this.fileUpLoadRepository.uploadImage(file);

    await this.usersRepository.update(user.id, {
      Image_Profile: uploadResponse.url,
    });

    return await this.usersRepository.findOneBy({
      id: Id,
    });
  }
}
