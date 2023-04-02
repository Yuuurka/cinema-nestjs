import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {plainToClassFromExist} from "class-transformer";
import {validate} from "class-validator";
import {ValidationException} from "../exceptions/validation.exception";


/** Validation Pipe используется для автоматической проверки данных входящего запроса на основе определенных
 * правил проверки и предотвращения дальнейшей обработки недопустимых данных в приложении. **/
@Injectable()
export  class ValidationPipe implements PipeTransform<any>{
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClassFromExist(metadata.metatype, value);
        const errors = await validate(obj);

        if (errors.length){
            let messages = errors.map(err => {
                return `${err.property} - ${Object.values(err.constraints).join(', ')}`
            })
            throw new ValidationException(messages)
        }
    }
}