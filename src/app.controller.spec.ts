import { Test, TestingModule } from '@nestjs/testing';
import type { Response } from 'express';
import { join } from 'path';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('health', () => {
    it('should report a healthy status', () => {
      expect(appController.getHealth()).toEqual({ status: 'ok' });
    });
  });

  describe('serveApp', () => {
    it('should send the SPA index.html for any other route', () => {
      const sendFile = jest.fn();
      const res = { sendFile } as unknown as Response;

      appController.serveApp(res);

      expect(sendFile).toHaveBeenCalledWith(
        join(__dirname, '..', 'client', 'dist', 'index.html'),
      );
    });
  });
});
