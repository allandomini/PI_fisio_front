import { Intensity, Joint } from "./exercise";

export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public role: string,
        public picture: string,
        public courses: string[],
        public jointIntensities: JointIntensity[]
    ){}
}

export class JointIntensity{
    constructor(
        public joint: Joint,
        public intensity: Intensity,
    ){}
}
