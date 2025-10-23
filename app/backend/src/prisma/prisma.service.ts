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
    if (!Number.isFinite(raw)) {
      return 5;
    }

    if (raw <= 0) {
      return null;
    }

    return Math.floor(raw);
  })();

  private readonly retryDelayMs = (() => {
    const raw = Number(process.env.PRISMA_RETRY_DELAY_MS ?? 2000);
    return Number.isFinite(raw) && raw >= 0 ? Math.floor(raw) : 2000;
  })();

  onModuleInit(): void {
    this.tryConnectWithRetry();
  }

  private tryConnectWithRetry(attempt = 1): void {
    this.$connect()
      .then(() => {
        this.logger.log('Database connection established.');
      })
      .catch((error) => {
        const reachedMaxRetries =
          this.maxRetries !== null && attempt >= this.maxRetries;
        const reason = error instanceof Error ? error.message : String(error);

        if (reachedMaxRetries) {
          this.logger.error(
            `Failed to connect to the database after ${attempt} attempt(s). Keeping the API running and retrying in ${this.retryDelayMs}ms. Reason: ${reason}`,
            error instanceof Error ? error.stack : String(error),
          );
        } else {
          this.logger.warn(
            `Database connection failed (attempt ${attempt}/${this.maxRetries ?? '∞'}). Retrying in ${this.retryDelayMs}ms... Reason: ${reason}`,
          );
        }

        const nextAttempt =
          reachedMaxRetries && this.maxRetries !== null ? 1 : attempt + 1;

        setTimeout(() => this.tryConnectWithRetry(nextAttempt), this.retryDelayMs);
      });
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
