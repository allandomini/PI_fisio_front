import { Intensity, Joint } from "./exercise";

export class User {
    constructor(
        public id: number | null,
        public name: string | null,
        public email: string | null,
        public dateOfBirth: string | null,
        public role: string | null,
        public pictureUrl: string | null ,
        public subject: string | null,
        public classes: string[] | null,
        public jointIntensities: JointIntensity[] | null
    ){}
}

export class JointIntensity{
    constructor(
        public joint: Joint,
        public intensity: Intensity,
    ){}
}
