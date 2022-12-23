import { ConsoleLogger, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Configuration, ImagesResponse, OpenAIApi } from 'openai';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  envFilePath: '.env',
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptSuffix = ', white background, ';

@Injectable()
export class AppService {
  async generate(input: string, type: string): Promise<string[]> {
    // Run first prompt
    console.log(`API: ${input} ${basePromptSuffix} ${type}`);

    let response: any = [];
    try {
      response = await openai.createImage({
        prompt: `${input} ${basePromptSuffix}`,
        n: 5,
        size: '256x256',
      });
    } catch (err) {
      console.error(err);
    }

    const images_url = response.data.data.map((d) => d.url);
    console.log(images_url);
    return images_url;
  }
}
