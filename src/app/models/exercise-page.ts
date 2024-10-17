import { Exercise } from "./exercise";

export class ExercisePage {
    constructor(
        public exercises: Exercise[],
        public totalElements: number,
        public totalPages: number,
    ){

    }
}
