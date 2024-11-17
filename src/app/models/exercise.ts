export class Exercise {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public reps: string,
        public videoUrl: string,
        public intensity: Intensity |   null,
        public joint: Joint | null
    ) {}
}

export enum Intensity {
    High = 'HIGH',
    Medium = 'MEDIUM',
    Low = 'LOW'
}
export enum IntensityPTBR {
    HIGH ='Intensa',
    MEDIUM ='Moderada',
    LOW = 'Leve',
}

export enum Joint {
    Ankle = 'ANKLE',
    Cervical = 'CERVICAL',
    Hip = 'HIP',
    Knee = 'KNEE',
    Lowerback = 'LOWERBACK',
    Shoulder = 'SHOULDER'
}

export enum JointPTBR {
    CERVICAL = 'Cervical',
    SHOULDER = 'Ombro',
    LOWERBACK ='Lombar',
    KNEE ='Joelho',
    ANKLE ='Tornozelo',
    HIP = 'Quadril',
  };