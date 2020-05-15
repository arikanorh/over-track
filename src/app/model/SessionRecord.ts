import { GameRecord } from './GameRecord';

export class SessionRecord {
    started;
    id;
    name?:string;
    win:number;
    lose:number;
    total:number;
    tie:number;
    last_game?:GameRecord
}
