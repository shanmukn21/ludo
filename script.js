let dca = 1;
let cnt = 0, x = 0, y = 0, k = 0, p = 0, rd = 1, rn = 6, mp = 0, ec = 0, pc = ["blue", "red", "green", "yellow"];
let pt = 0;//piece taken
let wo = [];
let colors = [];
let skip = [];
let nop = 4;
let nopo = 0;

//pc:player color, rn:random number, x&y:coordinates, p:indeces of pc, k:step(1-57)

let chldc = 0;

let chlda = [];

const dice = document.getElementById("dice");
const b3 = document.getElementById("b3");
const start = document.getElementById("start");
const home = document.getElementById("home");
const restart = document.getElementById("restart");
const plyrc = document.getElementById("plyrc");
const plyrl = document.getElementById("plyrl");
const plyrr = document.getElementById("plyrr");
const pesc = document.getElementById("pesc");
const pcsl = document.getElementById("pcsl");
const pcsr = document.getElementById("pcsr");
const intro = document.getElementById("intro");
const btm = document.getElementById("btm");
const body = document.querySelector('body');

let chld = document.querySelector('body');
let prnt = document.querySelector('body');

let state = body.innerHTML;

chld.c = -1;
let debugdice = false;
let debugplyr = false;

let flickTimeout; // Store the timeout ID for flickering

let mat = {}; // Initialize the main matrix

function Initialize() {
    dca = 1;
    cnt = 0, x = 0, y = 0, k = 0, p = 0, rd = 1, rn = 6, mp = 0, ec = 0, pc = ["blue", "red", "green", "yellow"];
    pt = 0;
    wo = [];
    colors = [];
    skip = [];
    chldc = 0;
    chlda = [];
    chld.c = -1;

    for (let i = 0; i <= 56; i++) {
        mat[i] = {}; // Initialize each index as an object
        for (let j of ['b', 'r', 'g', 'y']) { // Use 'of' with array elements
            for (let n = 1; n <= 4; n++) {
                mat[i][`${j}p${n}`] = 0; // Set default value to 0
            }
        }
    }
    for (let i = 0; i < 4; i++) {
        let c = pc[i][0];
        prnt = document.querySelector(`.${c}s`);
        prnt.data = new Array(0, 0, 0, 0);
        document.getElementById(`${pc[i]}`).addEventListener('click', () => {
            if (rn === 6 && prnt.childElementCount < 4) {
                pieceout();
            }
        });
    }
    for (let i = (nop - 1); i >= 0; i--) {
        colors[i] = pc[i];
        p = i;
        chlda = [];
        chldc = 0;
        for (let j = 0; j < nopo; j++) {
            pieceout();
        }
    }
    console.log(`Blue's turn`);
    for (let i = nop; i < 4; i++) {
        skip[i] = pc[i];
    }
    p = 0;
    let c = pc[p][0];
    prnt = document.querySelector(`.${c}s`);
    flickw(); // Start new flickering cycle
}

plyrl.addEventListener('click', () => {
    if (nop > 2) {
        nop--;
        plyrc.innerText = `${nop}`;
    }
});

plyrr.addEventListener('click', () => {
    if (nop < 4) {
        nop++;
        plyrc.innerText = `${nop}`;
    }
});

pcsl.addEventListener('click', () => {
    if (nopo > 0) {
        nopo--;
        pesc.innerText = `${nopo}`;
    }
});

pcsr.addEventListener('click', () => {
    if (nopo < 4) {
        nopo++;
        pesc.innerText = `${nopo}`;
    }
});

start.addEventListener('click', () => {
    Initialize();
    intro.style.display = 'none';
    btm.style.display = 'flex';
    state = body.innerHTML;
});

home.addEventListener('click', () => {
    location.reload();
});

restart.addEventListener('click', () => {
    body.innerHTML = state;
});

dice.addEventListener('click', () => {
    if (rd === 1) {
        rd = 0;
        if (dice.classList.contains('pulse-animation')) {
            dice.classList.remove('pulse-animation');
        }
        dice.style.animation = "dice-rotate 0.5s ease-in-out";
        setTimeout(gnrtnum, 250);

        dice.addEventListener('animationend', () => {
            dice.style.animation = "";
        }, { once: true });
    }
});

function trydebugplyr() {
    console.log(chlda);
    console.log(chldc);
    if (chldc > 0) {
        //player debugging starts here
        if (chldc > 0) {
            if (chldc === 1) {
                if (rn === 6 && debugplyr && ec === 1) {
                    document.getElementById(`${pc[p]}`).click();
                }
                else if (rn !== 6) {
                    chld.click();
                }
            } else if (chldc === 2) {
                if ((chlda[0].c + rn) >= 56 && (chlda[1].c + rn) >= 56 && rn === 6) {
                    document.getElementById(`${pc[p]}`).click();
                } else if (rn !== 6 && clickable()) {
                    chlda[clickit()].click();
                } else if (debugplyr && ec === 1 && dca === 0) {
                    if ((chlda[0].c + rn) === 56) {
                        console.log(`${chlda[0].className} can reach destination`);
                        chlda[0].click();
                    } else if ((chlda[1].c + rn) === 56) {
                        console.log(`${chlda[1].className} can reach destination`);
                        chlda[1].click();
                    } else {
                        highpriority();
                    }
                }
            } else if (chldc === 3) {
                if ((chlda[0].c + rn) >= 56 && (chlda[1].c + rn) >= 56 && (chlda[2].c + rn) >= 56 && rn === 6) {
                    document.getElementById(`${pc[p]}`).click();
                } else if (rn !== 6 && clickable()) {
                    chlda[clickit()].click();
                } else if (debugplyr && ec === 1 && dca === 0) {
                    if ((chlda[0].c + rn) === 56) {
                        console.log(`${chlda[0].className} can reach destination`);
                        chlda[0].click();
                    } else if ((chlda[1].c + rn) === 56) {
                        console.log(`${chlda[1].className} can reach destination`);
                        chlda[1].click();
                    } else if ((chlda[2].c + rn) === 56) {
                        console.log(`${chlda[2].className} can reach destination`);
                        chlda[2].click();
                    } else {
                        highpriority();
                    }
                }
            } else if (chldc === 4) {
                if (clickable()) {
                    chlda[clickit()].click();
                } else if (debugplyr && ec === 1 && dca === 0) {
                    if ((chlda[0].c + rn) === 56) {
                        console.log(`${chlda[0].className} can reach destination`);
                        chlda[0].click();
                    } else if ((chlda[1].c + rn) === 56) {
                        console.log(`${chlda[1].className} can reach destination`);
                        chlda[1].click();
                    } else if ((chlda[2].c + rn) === 56) {
                        console.log(`${chlda[2].className} can reach destination`);
                        chlda[2].click();
                    } else if ((chlda[3].c + rn) === 56) {
                        console.log(`${chlda[3].className} can reach destination`);
                        chlda[3].click();
                    } else {
                        highpriority();
                    }
                }
            }
        }
        //player debugging ended here
    }
}

function clickable() {
    let clickp = 0;
    for (let j = 0; j < chldc; j++) {
        if ((chlda[j].c + rn) <= 56) {
            clickp++;
        }
    }
    console.log('clickp:', clickp);
    dca = 0;
    if (clickp === 1) {
        dca = 0;
        return true;
    } else if (clickp === chldc) {//trying to move a single piece when two or pieces are on same spot if chldc===clickp
        let j = 0;
        for (j = 0; j < chldc; j++) {
            if ((chlda[0].c) !== chlda[j].c) {
                break;
            }
        }
        if (j === chldc) {
            console.log('all movable elements are on same spot');
            dca = 1;
            highpriority();
        } else {
            dca = 0;
        }
    }
    return false;
}

function clickit() {
    for (let j = 0; j < chldc; j++) {
        if ((chlda[j].c + rn) <= 56) {
            console.log('clicking the single piece possible');
            return j;
        }
    }
}

function highpriority() {
    let pn = 0;
    for (let j = 0; j < chldc; j++) {
        if ((chlda[j].c + rn) <= 56) {
            if (chlda[j].c + rn > pn) {
                pn = chlda[j].c + rn;
                chld = chlda[j];
                console.log(`${chld.className} is temporary`);
            }
        }
    }
    console.log(`${chld.className} is permanent`);
    chld.click();
}

function chngplayer() { // Change player
    p = (p + 1) % 4;
    console.log(`${pc[p]}'s turn`);
    rn = 0;
    rd = 1;
    dice.classList.add("pulse-animation");
    stopFlicker(); // Stop any ongoing flickering
    flickw(); // Start new flickering cycle
    chngz();
    if (wo.includes(pc[p]) || skip.includes(pc[p])) {
        chngplayer();
    } else if (debugdice) {
        dice.click();
    }
}

function flickw() {
    for (let i = 0; i < 4; i++) {
        if (p === i) {
            document.querySelector(`#${pc[i]}`).style.borderColor = "white";
        } else {
            document.querySelector(`#${pc[i]}`).style.borderColor = `${pc[i]}`;
        }
    }
    flickTimeout = setTimeout(flickb, 150); // Schedule flickb
}

function flickb() {
    document.querySelector(`#${pc[p]}`).style.borderColor = `${pc[p]}`;
    flickTimeout = setTimeout(flickw, 300); // Schedule flickw
}

function stopFlicker() {
    clearTimeout(flickTimeout); // Clear any ongoing flickering timeout
}

function chngz() {
    chlda = [];
    chldc = 0;
    let zic = 16;
    for (let i = 0; i < 4; i++) {
        if (i === p) {
            document.getElementById(`${pc[i]}`).style.pointerEvents = 'all';
        } else {
            document.getElementById(`${pc[i]}`).style.pointerEvents = 'none';
        }
        for (let j = 1; j <= 4; j++) {
            let tchld = document.querySelector(`.${pc[i][0]}p${j}`);
            if (tchld) {
                if (i === p) {
                    zic++;
                    tchld.style.zIndex = `${zic}`;
                    tchld.style.pointerEvents = 'all';
                    chld = tchld;
                    chlda[chldc] = tchld;
                    chldc++;
                } else {
                    tchld.style.zIndex = '1';
                    tchld.style.pointerEvents = 'none';
                }
            }
        }
    }
}
function findcord() {//finds coordinates of piece
    if (k < 57 && k <= (chld.c + rn) && 57 > (chld.c + rn)) {//default cmnts for blue
        if ([1, 2, 3, 4, 11, 12, 19, 20, 21, 22, 23, 51, 52, 53, 54, 55, 56].includes(k)) {//move up
            if (p === 0) {
                x = 0;
                y = -1;
            } else if (p === 1) {
                x = 1;
                y = 0;
            } else if (p === 2) {
                x = 0;
                y = 1;
            } else if (p === 3) {
                x = -1;
                y = 0;
            }
        } else if (k === 5) {//up left
            if (p === 0) {
                x = -1;
                y = -1;
            } else if (p === 1) {
                x = 1;
                y = -1;
            } else if (p === 2) {
                x = 1;
                y = 1;
            } else if (p === 3) {
                x = -1;
                y = 1;
            }
        } else if ([6, 7, 8, 9, 10, 39, 40, 41, 42, 43, 50].includes(k)) {//left
            if (p === 0) {
                x = -1;
                y = 0;
            } else if (p === 1) {
                x = 0;
                y = -1;
            } else if (p === 2) {
                x = 1;
                y = 0;
            } else if (p === 3) {
                x = 0;
                y = 1;
            }
        } else if ([13, 14, 15, 16, 17, 24, 25, 32, 33, 34, 35, 36].includes(k)) {//right
            if (p === 0) {
                x = 1;
                y = 0;
            } else if (p === 1) {
                x = 0;
                y = 1;
            } else if (p === 2) {
                x = -1;
                y = 0;
            } else if (p === 3) {
                x = 0;
                y = -1;
            }
        } else if (k === 18) {//up right
            if (p === 0) {
                x = 1;
                y = -1;
            } else if (p === 1) {
                x = 1;
                y = 1;
            } else if (p === 2) {
                x = -1;
                y = 1;
            } else if (p === 3) {
                x = -1;
                y = -1;
            }
        } else if ([26, 27, 28, 29, 30, 37, 38, 45, 46, 47, 48, 49].includes(k)) {//down
            if (p === 0) {
                x = 0;
                y = 1;
            } else if (p === 1) {
                x = -1;
                y = 0;
            } else if (p === 2) {
                x = 0;
                y = -1;
            } else if (p === 3) {
                x = 1;
                y = 0;
            }
        } else if (k === 31) {//down right
            if (p === 0) {
                x = 1;
                y = 1;
            } else if (p === 1) {
                x = -1;
                y = 1;
            } else if (p === 2) {
                x = -1;
                y = -1;
            } else if (p === 3) {
                x = 1;
                y = -1;
            }
        } else if (k === 44) {//down left
            if (p === 0) {
                x = -1;
                y = 1;
            } else if (p === 1) {
                x = -1;
                y = -1;
            } else if (p === 2) {
                x = 1;
                y = -1;
            } else if (p === 3) {
                x = 1;
                y = 1;
            }
        }
        setTimeout(movep, 50);
    }
}

function movep() {//moves piece
    let dch = 0;
    let xp = x * 15;
    let yp = y * 15;
    chld.x += xp;
    chld.y += yp;
    chld.style.transform = `translate(${chld.x}px, ${chld.y}px)`;
    k++;
    if (k < 57 && k <= (chld.c + rn) && 57 > (chld.c + rn)) {
        setTimeout(findcord, 50);
    } else if (chld.c + rn <= 56) {
        let opmd = 0;
        if (chld) {
            console.log(`moved ${chld.className} from ${chld.c} to ${k - 1}`);
            mat[chld.c][chld.className] = 0;
            chld.c += rn;
            mat[chld.c][chld.className] = 1;
            pt = 0;
            if (safe()) {
                console.log(`${chld.className} moved to safety`);
            } else if (chld.c < 51) {
                take();
            }
            if (chld.c === 56) {
                opmd = 1;
                let i = 0;
                for (i = 1; i <= 4; i++) {
                    let tchld = document.querySelector(`.${pc[p][0]}p${i}`);
                    if (tchld && (tchld.c !== 56)) {
                        break;
                    } else if (!tchld) {
                        break;
                    }
                }
                if (i === 5) {
                    wo[cnt] = pc[p];
                    cnt++;
                    console.log(`*********`);
                    console.log(`${cnt}.${pc[p]}`);
                    console.log(`*********`);
                    let tstndngs = document.createElement('div');
                    tstndngs.style.color = `${pc[p]}`;
                    tstndngs.innerText = `${cnt}.${pc[p]}`;
                    if (body.style.flexDirection === 'row') {
                        document.getElementById('stndngsd').appendChild(tstndngs);
                    } else {
                        document.getElementById('stndngsm').appendChild(tstndngs);
                    }
                }
                if (cnt === (nop - 1)) {
                    console.log(`*********`);
                    console.log('game over');
                    console.log(`*********`);
                    debugdice = false;
                    stopFlicker();
                    document.querySelector(`#${pc[p]}`).style.borderColor = `${pc[p]}`;
                    return;
                }
            }
            if (rn !== 6 && pt === 0 && opmd === 0) {
                chngplayer();
                dch = 1;
            }
            rn = 0;
            rd = 1;
            dice.classList.add("pulse-animation");
        }
        if (dch === 0) {
            if (debugdice) { dice.click(); }
        }
    }
}

function safe() {
    if ([0, 8, 13, 21, 26, 34, 39, 47].includes(chld.c)) {
        return true;
    } else {
        return false;
    }
}

function take() {
    let ci = ['b', 'r', 'g', 'y'];
    let z = ci.indexOf(pc[p][0]);
    z = (z + 1) % 4;
    for (let i = 0, m = 39; i < 3; z = (z + 1) % 4, i++, m -= 13) {
        let j = ci[z];
        let indx = (chld.c + m) % 52;
        for (let n = 1; n <= 4; n++) {
            let tmpc = document.querySelector(`.${j}p${n}`);
            if (mat[indx][`${j}p${n}`] === 1 && tmpc.c < 51) {
                console.log(` ${j}p${n} taken by ${chld.className}`);
                mat[indx][`${j}p${n}`] = 0;
                let tmpp = tmpc.parentElement;
                tmpp.removeChild(tmpc);
                tmpp.data[n - 1] = 0;
                let tmprp = document.querySelector(`#${j}p${n}`);
                let tmprc = document.createElement('div');
                tmprc.id = `${j}pi${n}`;
                tmprp.appendChild(tmprc);
                pt = 1;
                return;
            }
        }
    }
}

function pieceout() {//creates piece or brings out piece
    let c = pc[p][0];
    prnt = document.querySelector(`.${c}s`);
    for (let i = 1; i <= 4; i++) {
        if (prnt.data[i - 1] === 0) {
            prnt.data[i - 1] = 1;
            chld = document.createElement('div');
            chld.className = `${c}` + 'p' + `${i}`;
            chld.style.backgroundColor = `${pc[p]}`;
            chld.style.zIndex = `16`;
            document.getElementById(`${c}p${i}`).removeChild(document.getElementById(`${c}pi${i}`));
            console.log(`${chld.className} came out`);
            rn = 0;
            rd = 1;
            dice.classList.add("pulse-animation");
            chld.c = 0;
            chld.x = 0;
            chld.y = 0;
            chld.addEventListener('click', () => {
                console.log(`clicking ${chld.className}`);
                chld = document.querySelector(`.${c}p${i}`);
                console.log(`or ${chld.className}`);
                if (pc[p] === chld.style.backgroundColor && (chld.c + rn) <= 56 && rn > 0) {
                    console.log(`${chld.className} clicked`);
                    k = 0;
                    if (chld.c > -1) {
                        k = chld.c + 1;
                    }
                    setTimeout(findcord, 50);
                }
            });
            prnt.appendChild(chld);
            chlda[chldc] = chld;
            chldc++;
            ec = 1;//element created or exists
            break;
        }
    }
    if (debugdice) { dice.click(); }
}
function gnrtnum() {//generates random num b/w 1 to 6
    rn = Math.floor(Math.random() * 6) + 1;
    console.log('dice rolled:', rn);

    //change face of the dice or roll dice
    for (let i = 0; i < rn; i++) {
        document.getElementById(`b${i + 1}`).style.display = "block";
    } for (let i = rn; i < 6; i++) {
        document.getElementById(`b${i + 1}`).style.display = "none";
    }
    if (rn !== 4) {
        dice.style.rowGap = "0px";
    }
    if (rn === 5) {
        dice.style.padding = "8px";
        b3.style.marginLeft = "12px";
        b3.style.marginRight = "12px";
    } else {
        b3.style.marginLeft = "0px";
        b3.style.marginRight = "0px";
        if (rn === 1) {
            dice.style.padding = "20px";
        } else if (rn === 2) {
            dice.style.padding = "11px";
        } else if (rn === 4) {
            dice.style.padding = "11px";
            dice.style.rowGap = "6px";
        } else {
            dice.style.padding = "7px";
        }
    }
    checklmts();
}

function checklmts() {// check the limits of the piece with rn
    console.log(`checking ${pc[p]} limits`);
    let cc = 0, c = pc[p][0];//cc: change color or player
    prnt = document.querySelector(`.${c}s`);
    if (chld) {
        console.log(`${chld.className} exists`);
        let cm = 0, stlin = 0;
        for (i = 1; i <= 4; i++) {
            let tchld = document.querySelector(`.${pc[p][0]}p${i}`);
            if (tchld && ((tchld.c + rn) > 56 || tchld.c === 56)) {
                cm++;//cant move because out of range or reached destination
            } else if (!tchld && rn !== 6) {
                stlin++;//still inside the box  
            }
        }
        if ((cm + stlin) === 4 && rn !== 6) {
            console.log(`can't move ${pc[p]} pieces for ${rn}`);
            cc = 1;
        } else if ((cm + stlin) === 4 && rn === 6 && debugdice) {
            console.log('hi');
            rd = 1;
            dice.click();
        }
    } else {
        console.log(`${chld.className} does not exists`);
    }
    if (rn === 6) {
        console.log('lucky');
        if (prnt.childElementCount === 0 || (debugplyr && ec === 1 && prnt.childElementCount < 4)) {
            console.log('piece out:')
            pieceout();
        } else if (prnt.childElementCount > 0) {
            console.log('trying auto debug');
            trydebugplyr();
        }
    } else {
        console.log('unlucky');
        if (prnt.childElementCount === 0) {
            console.log('color change.')
            cc = 1;
        } else {
            console.log('trying auto debug');
            trydebugplyr();
        }
    }
    if (cc === 1) {
        cc = 0;
        chngplayer();
    }
}
