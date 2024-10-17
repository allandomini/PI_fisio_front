import { Intensity, Joint } from "./exercise";

export class ExerciseFilterDTO {
    constructor(
        public joints: Joint[],
        public intensities: Intensity[],
        public name: string,
    ){}
}
