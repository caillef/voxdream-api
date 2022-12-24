import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/pixelart')
  async generatePixelart(@Body('userInput') input: string): Promise<any> {
    return {
      images_url: await this.appService.generate(input, 'pixel art'),
    };
  }

  @Post('/voxelart')
  async generateVoxelart(@Body('userInput') input: string): Promise<any> {
    return {
      images_url: await this.appService.generate(input, 'voxel art'),
    };
  }
}
