

const CalculateUnits = ({ minutes }: Props) => {
    if (minutes >= 8 && minutes <= 22) {
        return 1;
    } else if (minutes >= 23 && minutes <= 37) {
        return 2;
    } else if (minutes >= 38 && minutes <= 52) {
        return 3;
    } else if (minutes >= 53 && minutes <= 67) {
        return 4;
    } else if (minutes >= 68 && minutes <= 82) {
        return 5;
    } else if (minutes >= 83 && minutes <= 97) {
        return 6;
    } else if (minutes >= 98 && minutes <= 112) {
        return 7;
    } else if (minutes >= 113 && minutes <= 127) {
        return 8;
    } else if (minutes >= 128 && minutes <= 142) {
        return 9;
    } else if (minutes >= 143 && minutes <= 157) {
        return 10;
    } else if (minutes >= 158 && minutes <= 172) {
        return 11;
    } else if (minutes >= 173 && minutes <= 187) {
        return 12;
    } else if (minutes >= 188 && minutes <= 202) {
        return 13;
    } else if (minutes >= 203 && minutes <= 217) {
        return 14;
    } else if (minutes >= 218 && minutes <= 232) {
        return 15;
    } else if (minutes >= 233 && minutes <= 247) {
        return 16;
    } else if (minutes >= 248 && minutes <= 262) {
        return 17;
    } else if (minutes >= 263 && minutes <= 277) {
        return 18;
    } else if (minutes >= 278 && minutes <= 292) {
        return 19;
    } else if (minutes >= 293 && minutes <= 307) {
        return 20;
    } else if (minutes >= 308 && minutes <= 322) {
        return 21;
    } else if (minutes >= 323 && minutes <= 337) {
        return 22;
    } else if (minutes >= 338 && minutes <= 352) {
        return 23;
    } else if (minutes >= 353 && minutes <= 367) {
        return 24;
    } else if (minutes >= 368 && minutes <= 382) {
        return 25;
    } else if (minutes >= 383 && minutes <= 397) {
        return 26;
    } else if (minutes >= 398 && minutes <= 412) {
        return 27;
    } else if (minutes >= 413 && minutes <= 427) {
        return 28;
    } else if (minutes >= 428 && minutes <= 442) {
        return 29;
    } else if (minutes >= 443 && minutes <= 457) {
        return 30;
    } else if (minutes >= 458 && minutes <= 472) {
        return 31;
    } else if (minutes >= 473 && minutes <= 487) {
        return 32;
    } else if (minutes >= 488 && minutes <= 502) {
        return 33;
    } else if (minutes >= 503 && minutes <= 517) {
        return 34;
    } else if (minutes >= 518 && minutes <= 532) {
        return 35;
    } else if (minutes >= 533 && minutes <= 547) {
        return 36;
    } else if (minutes >= 548 && minutes <= 562) {
        return 37;
    } else if (minutes >= 563 && minutes <= 577) {
        return 38;
    } else {
        return 0;
    }
}

type Props = {
    minutes: number;
}

export { CalculateUnits }