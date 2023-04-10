import {HttpStatus} from "@nestjs/common";
import {File} from "../../file.entity"

export const fileStub = (): File => {
    return {
        id: 1,
        url: "1d7167c4-31d9-4d18-b433-4b35506704e1.jpg",
        createdAt: '02.04.2023, 15:23:03',
        essenceId: 1,
        essenceTable: 'entity',
    }
}

export const fileNonUseStub = (): File => {
    return {
        id: 1,
        url: "21d7167c4-31d9-4d18-b433-4b35506704e1.jpg",
        createdAt: '02.04.2023, 15:23:03',
        essenceId: null,
        essenceTable: null,
    }
}

export const createFile = (): string => {
    return fileStub().url
}

export const deleteNonUseImages = (): object => {
    return {"code": HttpStatus.OK, "result": `1 images removed`, "error": null}
}