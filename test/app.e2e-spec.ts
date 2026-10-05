import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET) renders the home page with a loader and hidden content', async () => {
    const response = await request(app.getHttpServer()).get('/').expect(200);

    expect(response.headers['content-type']).toContain('text/html');
    expect(response.text).toContain('id="loader"');
    expect(response.text).toContain('id="content"');
  });

  afterEach(async () => {
    await app.close();
  });
});
