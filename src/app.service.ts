import { Injectable } from '@nestjs/common';

/**`@Injectable()` — это декоратор в NestJS, который помечает класс
как провайдер, который может быть внедрен
как зависимость в другие классы. Это позволяет создавать многократно
используемый код, который легко поддерживать и тестировать. **/
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
