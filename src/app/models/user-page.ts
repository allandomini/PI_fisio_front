import { User } from "./user";

export class UserPage {
    constructor(
        public users: User[],
        public totalElements: number,
        public totalPages: number,
    ){

    }
}
