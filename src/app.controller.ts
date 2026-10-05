import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get('health')
  getHealth(): { status: string } {
    return { status: 'ok' };
  }

  @Get('{*path}')
  serveApp(@Res() res: Response): void {
    res.sendFile(join(__dirname, '..', 'client', 'dist', 'index.html'));
  }
}
