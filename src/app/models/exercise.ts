export class Exercise {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public reps: string,
        public videoUrl: string,
        public intensity: Intensity | null,
        public joint: Joint | null
    ) {}
}

export enum Intensity {
    High = 'HIGH',
    Medium = 'MEDIUM',
    Low = 'LOW'
}

export enum Joint {
    Ankle = 'ANKLE',
    Cervical = 'CERVICAL',
    Hip = 'HIP',
    Knee = 'KNEE',
    LowerBack = 'LOWERBACK',
    Shoulder = 'SHOULDER'
}