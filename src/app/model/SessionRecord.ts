import { GameRecord } from './GameRecord';
import { Char } from './Char';

export class SessionRecord {
    started;
    id;
    name?:string;
    win:number;
    lose:number;
    total:number;
    tie:number;
    last_game= new GameRecord();
    char= new Char();
    role:'TANK'|'DPS'|'SUPPORT'
}
