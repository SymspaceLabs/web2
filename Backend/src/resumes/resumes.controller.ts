import { Controller } from '@nestjs/common';
import { ResumesService } from './resumes.services';

@Controller('product-3d-models')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}


}
