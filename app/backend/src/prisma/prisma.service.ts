import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  private readonly maxRetries = (() => {
    const raw = Number(process.env.PRISMA_CONNECTION_RETRIES ?? 5);
    return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 5;
  })();

  private readonly retryDelayMs = (() => {
    const raw = Number(process.env.PRISMA_RETRY_DELAY_MS ?? 2000);
    return Number.isFinite(raw) && raw >= 0 ? Math.floor(raw) : 2000;
  })();

  async onModuleInit() {
    await this.tryConnectWithRetry();
  }

  private async tryConnectWithRetry(attempt = 1): Promise<void> {
    try {
      await this.$connect();
    } catch (error) {
      if (attempt >= this.maxRetries) {
        this.logger.error(
          `Failed to connect to the database after ${attempt} attempt(s).`,
          error instanceof Error ? error.stack : String(error),
        );
        throw error;
      }

      const reason = error instanceof Error ? error.message : String(error);
      this.logger.warn(
        `Database connection failed (attempt ${attempt}/${this.maxRetries}). Retrying in ${this.retryDelayMs}ms... Reason: ${reason}`,
      );

      await new Promise((resolve) => setTimeout(resolve, this.retryDelayMs));
      await this.tryConnectWithRetry(attempt + 1);
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
