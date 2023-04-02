/**DTO означает объект передачи данных. Это шаблон проектирования,
используемый для передачи данных между различными уровнями приложения.
DTO используются для инкапсуляции данных и предоставления удобного
способа передачи данных между различными частями приложения, такими
как контроллеры, службы и базы данных **/

export class CreateTextBlockDto{
    readonly id: number;
    readonly uniqueName: string;
    readonly name: string;
    readonly text: string;
    readonly group: string;
}