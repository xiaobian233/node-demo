import { Controller, Get, Inject } from '@midwayjs/core';
import * as fs from 'fs';
@Controller('/video')
export class Video {
  @Inject()
  ctx;
  @Get('/get')
  async get() {
    const videoPath = 'public/video.mp4';
    const videoStat = fs.statSync(videoPath);
    this.ctx.set({
      'Content-Type': 'video/mp4',
      'Content-Length': videoStat.size,
    });
    const videoStream = fs.createReadStream(videoPath);
    this.ctx.body = videoStream;
  }
}
