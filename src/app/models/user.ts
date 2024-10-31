import { Intensity, Joint } from "./exercise";

export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public role: string,
        public pictureUrl: string,
        public subject: string,
        public classes: string[],
        public jointIntensities: JointIntensity[]
    ){}
}

export class JointIntensity{
    constructor(
        public joint: Joint,
        public intensity: Intensity,
    ){}
}
