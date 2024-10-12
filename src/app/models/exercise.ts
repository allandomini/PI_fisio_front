export class Exercise {
    id!: number;
    name!: String;
    description!: String;
    reps!: String;
    intensity!: Intensity;
    joint!: Joint;
    videoUrl!: String;

    constructor(
        id: number,
        name: string,
        description: string,
        reps: string,
        intensity: Intensity,
        joint: Joint,
        videoUrl: string
    ) {
        this.id = id;
        this.description = description;
        this.intensity = intensity;
        this.joint = joint;
        this.name = name;
        this.reps = reps;
        this.videoUrl = videoUrl;
    }
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