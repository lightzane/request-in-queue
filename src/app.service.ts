import { Injectable } from '@nestjs/common';

const rand30 = () => Math.floor(Math.random() * 50 + 30);

@Injectable()
export class AppService {

  requestInQueue = false;

  queue: number[] = [];

  private counter: number = 0;

  async process(): Promise<any> {

    if (this.requestInQueue) {
      return this.getStatus();
    }

    this.requestInQueue = true;

    this.counter = 0;

    this.queue = [];

    this.queue = await this.getItems();

    for (const q of this.queue) {
      this.counter++;
      await this.convert();
    }

    this.requestInQueue = false;

    return this.queue;
  }

  private getItems(): Promise<number[]> {

    return new Promise(resolve => {
      setTimeout(() => {
        const rand = rand30();
        const result: number[] = [];
        for (let i = 0; i < rand; i++) {
          result.push(rand30());
        }
        resolve(result);
      }, 3000);
    });
  }

  private convert(): Promise<void> {
    const ms = Math.floor(Math.random() * 5000 + 1000);
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  getStatus(): string {

    if (!this.requestInQueue) {
      return `No process is happening at the moment`;
    }

    return `Processing ${this.counter} out of ${this.queue.length}`;

  }
}
