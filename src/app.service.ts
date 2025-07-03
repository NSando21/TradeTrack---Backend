import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '¡Bienvenido a la API del Backend PI! 🚀';
  }

  getInfo() {
    return {
      name: 'Backend PI API',
      version: '1.0.0',
      description: 'API backend construida con NestJS',
      technologies: ['NestJS', 'TypeScript', 'PostgreSQL', 'TypeORM'],
    };
  }
} 