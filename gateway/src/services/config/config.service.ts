import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.API_GATEWAY_PORT;
    this.envConfig.tokenService = {
      options: {
        port: process.env.TOKEN_SERVICE_PORT,
        // host: process.env.TOKEN_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.userService = {
      options: {
        port: process.env.USER_SERVICE_PORT,
        // host: process.env.USER_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.menuService = {
      options: {
        port: process.env.MENU_SERVICE_PORT,
        host: process.env.MENU_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.notificationService = {
      options: {
        port: process.env.NOTIFICATION_SERVICE_PORT,
        host: process.env.NOTIFICATION_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.postService = {
      options: {
        port: process.env.POST_SERVICE_PORT,
        host: process.env.POST_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}