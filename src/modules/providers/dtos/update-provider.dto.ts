import { PartialType } from '@nestjs/swagger';
import { CreateProviderDTO } from './create-provider.dto';

export class UpdateProviderDTO extends PartialType(CreateProviderDTO) {}
