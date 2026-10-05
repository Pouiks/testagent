import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should render a loader and a hidden content block', () => {
      const html = appController.getHomePage();
      expect(html).toContain('id="loader"');
      expect(html).toContain('id="content"');
      expect(html).toContain('display: none');
    });

    it('should hide the loader and show the content after 3 seconds', () => {
      const html = appController.getHomePage();
      expect(html).toContain('3000');
    });
  });
});
