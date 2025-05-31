let dca = 1;
let cnt = 0, x = 0, y = 0, k = 0, p = 0, rd = 1, rn = 0, mp = 0, ec = 0, pc = ["blue", "red", "green", "yellow"];
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
const pesc = document.getElementById("pesc");
const pcsl = document.getElementById("pcsl");
const pcsr = document.getElementById("pcsr");
const intro = document.getElementById("intro");
const btm = document.getElementById("btm");
const confirm = document.getElementById("confirm");
const no = document.getElementById("no");
const body = document.querySelector('body');
const container = document.querySelector('#container');
const diceContainer = document.querySelector('.dice-container');
const pick = document.querySelectorAll('.pick');

const lh = document.querySelector('#bt');
const uh = document.querySelector('#rt');
const dh = document.querySelector('#gt');
const oh = document.querySelector('#yt');

function playercount() {
    nop = 0;
    for (let i = 0; i < pick.length; i++) {
        if (pick[i].classList.contains('active')) {
            nop++;
        }
    }
    console.log(nop);
}

for (let i = 0; i < pick.length; i++) {
    pick[i].addEventListener('click', () => {
        playercount();
        if (pick[i].classList.contains('active') && nop > 2) {
            pick[i].classList.remove('active');
            pick[i].classList.add('passive');
        } else {
            pick[i].classList.remove('passive');
            pick[i].classList.add('active');
        }
        playercount();
    });
}

lh.addEventListener('click', () => {
    if (ldc === 0 && udc === 1 && ddc === 1) {
        ldc = 1;
    } else {
        ldc = 0; udc = 0; ddc = 0;
    }
});

uh.addEventListener('click', () => {
    if (ldc === 0 && udc === 0 && ddc === 1) {
        udc = 1;
    } else {
        ldc = 0; udc = 0; ddc = 0;
    }
});

dh.addEventListener('click', () => {
    if (ldc === 0 && udc === 0 && ddc === 0) {
        ddc = 1;
    } else {
        ldc = 0; udc = 0; ddc = 0;
    }
});
let dbg = false;
let debugdice = false;
let debugplyr = false;

oh.addEventListener('click', () => {
    if (ldc === 1 && udc === 1 && ddc === 1) {
        if (dbg) {
            debugplyr = false;
            debugdice = false;
        } else {
            dbg = true;
            debugplyr = true;
            debugdice = true;
        }
    } else {
        ldc = 0; udc = 0; ddc = 0;
    }
});
let chld = document.querySelector('body');
let prnt = document.querySelector('body');

let ldc = 0, udc = 0, ddc = 0;

chld.c = -1;

let flickTimeout; // Store the timeout ID for flickering

let mat = {}; // Initialize the main matrix

function Initialize() {

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
        prnt.r = 0;
        document.getElementById(`${pc[i]}`).addEventListener('click', () => {
            if (rn === 6 && prnt.childElementCount < 4) {
                pieceout();
            }
        });
    }
    for (let i = 3; i >= 0; i--) {
        if (pick[i].classList.contains('passive')) {
            skip[i] = pick[i].classList[0];
        } else {

            colors[i] = pc[i];
            p = i;
            chlda = [];
            chldc = 0;
            for (let j = 0; j < nopo; j++) {
                pieceout();
            }
        }
    }
    diceContainer.classList.add(`${pc[p]}Turn`);
    let c = pc[p][0];
    prnt = document.querySelector(`.${c}s`);
    flickw(); // Start new flickering cycle
    if (dbg) {
        console.log("blue's turn");
    }

}

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
    btm.style.display = 'grid';
    board.style.opacity = '1';
    board.style.pointerEvents = 'all'
});

home.addEventListener('click', () => {
    location.reload();
});

restart.addEventListener('click', () => {
    if (cnt === (nop - 1)) {
        location.reload();
    } else {
        confirm.style.transform = "scale(1)";
    }
});

no.addEventListener('click', () => {
    confirm.style.transform = "scale(0)";
});

dice.addEventListener('click', () => {
    if (rd === 1) {
        rd = 0;
        dice.classList.remove('pulse');
        ////
        gnrtnum();
    }
});

function onlymove() {
    if (chldc > 0) {
        //player debugging starts here
        if (chldc > 0) {
            if (chldc === 1) {
                if (rn === 6 && ((debugplyr && ec === 1) || ((chlda[0].c + rn) > 56))) {
                    document.getElementById(`${pc[p]}`).click();
                }
                else if (rn !== 6) {
                    chld.click();
                }
            } else if (chldc === 2) {
                if ((chlda[0].c + rn) > 56 && (chlda[1].c + rn) > 56 && rn === 6) {
                    document.getElementById(`${pc[p]}`).click();
                } else if (rn !== 6 && clickable()) {
                    chlda[clickit()].click();

                } else if (debugplyr && ec === 1 && dca === 0) {
                    if ((chlda[0].c + rn) === 56) {
                        chlda[0].click();
                    } else if ((chlda[1].c + rn) === 56) {
                        chlda[1].click();
                    } else {
                        highpriority();
                    }
                }
            } else if (chldc === 3) {
                if ((chlda[0].c + rn) > 56 && (chlda[1].c + rn) > 56 && (chlda[2].c + rn) > 56 && rn === 6) {
                    document.getElementById(`${pc[p]}`).click();
                } else if (rn !== 6 && clickable()) {
                    chlda[clickit()].click();
                } else if (debugplyr && ec === 1 && dca === 0) {
                    if ((chlda[0].c + rn) === 56) {
                        chlda[0].click();
                    } else if ((chlda[1].c + rn) === 56) {
                        chlda[1].click();
                    } else if ((chlda[2].c + rn) === 56) {
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
                        chlda[0].click();
                    } else if ((chlda[1].c + rn) === 56) {
                        chlda[1].click();
                    } else if ((chlda[2].c + rn) === 56) {
                        chlda[2].click();
                    } else if ((chlda[3].c + rn) === 56) {
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
            chlda[j].cli = 1;
        } else {
            chlda[j].cli = 0;
        }
    }
    dca = 0;
    if (clickp === 1) {
        dca = 0;
        return true;
    } else if (clickp === chldc) {//trying to move a single piece when two or more pieces are on same spot if chldc===clickp
        let j = 0;
        for (j = 0; j < chldc; j++) {
            if ((chlda[0].c) !== chlda[j].c) {
                break;
            }
        }
        if (j === chldc) {//if all pieces are on same spot
            dca = 1;
            highpriority();
        } else {
            dca = 0;
        }
    } else if (clickp !== chldc) {
        let j = 0, l = 0, tchld = null;
        for (j = 0; j < chldc; j++) {
            if (chlda[j].cli === 1) {
                tchld = chlda[j];
                break;
            }
        }
        if (j !== chldc) {
            for (j = 0; j < chldc; j++) {
                if (tchld.c === chlda[j].c) {
                    l++;
                }
            }
            if (l === clickp) {
                dca = 1;
                highpriority();
            }
        }
    }
    return false;
}

function clickit() {
    for (let j = 0; j < chldc; j++) {
        if ((chlda[j].c + rn) <= 56) {
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
            }
        }
    }
    chld.click();
}

function chngplayer() { // Change player
    p = (p + 1) % 4;
    rn = 0;
    rd = 1;
    // dice.classList.add('pulse');
    stopFlicker(); // Stop any ongoing flickering
    flickw(); // Start new flickering cycle
    chngz();
    if (wo.includes(pc[p]) || skip.includes(pc[p])) {
        chngplayer();
    } else {
        if (diceContainer.classList.length > 1) { diceContainer.classList.remove(diceContainer.classList[1]); }
        diceContainer.classList.add(`${pc[p]}Turn`);
        if (dbg) {
            console.log(`${pc[p]}'s turn`);
        }
        if (debugdice) {
            dice.click();
        }
    }
}

function flickw() {
    for (let i = 0; i < 4; i++) {
        if (p === i) {
            document.querySelector(`#${pc[i]}`).style.background = "white";
        } else {
            document.querySelector(`#${pc[i]}`).style.background = `${pc[i]}`;
        }
    }
    flickTimeout = setTimeout(flickb, 150); // Schedule flickb
}

function flickb() {
    document.querySelector(`#${pc[p]}`).style.background = `${pc[p]}`;
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
        if (k === 56) {
            prnt.r++;
        }
        setTimeout(movep, 50);
    }
}

function movep() {//moves piece
    let dch = 0;
    let xp = x * 100;
    let yp = y * 100;
    chld.x += xp;
    chld.y += yp;
    chld.style.transform = `translate(${chld.x}%, ${chld.y}%)`;
    chld.children[0].innerText = ``;
    k++;
    if (k < 57 && k <= (chld.c + rn) && 57 > (chld.c + rn)) {
        setTimeout(findcord, 50);
    } else if (chld.c + rn <= 56) {
        let opmd = 0;
        if (chld) {
            mat[chld.c][chld.className] = 0;
            checkz();
            if (dbg) {
                console.log(`${chld.className}: ${chld.c} to ${chld.c + rn}`);
            }
            chld.c += rn;
            if (chld.c === 56) {
                if (prnt.r > 1) {
                    if (prnt.r === 4) {
                        if (rn === 6) {
                            chngplayer();
                        }
                    }
                }
            }
            mat[chld.c][chld.className] = 1;
            pt = 0;
            if (safe()) {
            } else if (chld.c < 51) {
                take();
            }
            if (chld.c <= 56) {
                teamup();
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
                    if (cnt === (nop - 1)) {
                        ////
                    }
                    let tstndngs = document.createElement('div');
                    tstndngs.style.background = `${pc[p]}`;
                    tstndngs.innerHTML = `${cnt}`;
                    document.getElementById('stndngsd').appendChild(tstndngs);
                }
                if (cnt === (nop - 1)) {
                    debugdice = false;
                    ////
                    dice.style.pointerEvents = 'none';
                    rd = 0;
                    dice.classList.remove('pulse');
                    rn = 0;
                    stopFlicker();
                    document.querySelector(`#${pc[p]}`).style.background = `${pc[p]}`;
                    return;
                }
            }
            if (rn !== 6 && pt === 0 && opmd === 0) {
                chngplayer();
                dch = 1;
            }
        }
        if (dch === 0) {
            rn = 0;
            rd = 1;
            // dice.classList.add('pulse');
            ////
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
function takec(j, indx) {
    let nc = 0;
    for (let n = 1; n <= 4; n++) {
        let tmpc = document.querySelector(`.${j}p${n}`);
        if (mat[indx][`${j}p${n}`] === 1 && tmpc.c < 56 && tmpc.className !== chld.className) {
            nc++;
        }
    }
    if (nc > 1) {
        for (let n = 1; n <= 4; n++) {
            let tmpc = document.querySelector(`.${j}p${n}`);
            if (mat[indx][`${j}p${n}`] === 1 && tmpc.c < 56) {
                tmpc.children[0].innerText = `${nc}`;
            }
        }
    } else {
        for (let n = 1; n <= 4; n++) {
            let tmpc = document.querySelector(`.${j}p${n}`);
            if (mat[indx][`${j}p${n}`] === 1 && tmpc.c < 56) {
                tmpc.children[0].innerText = ``;
            }
        }
    }
}
function checkz() {
    let j = pc[p][0];
    let indx = chld.c;
    let nc = 0;
    for (let n = 1; n <= 4; n++) {
        let tmpc = document.querySelector(`.${j}p${n}`);
        if (mat[indx][`${j}p${n}`] === 1 && tmpc.c < 56 && tmpc.className !== chld.className) {
            nc++;
        }
    }
    if (nc > 1) {
        for (let n = 1; n <= 4; n++) {
            let tmpc = document.querySelector(`.${j}p${n}`);
            if (mat[indx][`${j}p${n}`] === 1 && tmpc.c < 56) {
                tmpc.children[0].innerText = `${nc}`;
            }
        }
    } else {
        for (let n = 1; n <= 4; n++) {
            let tmpc = document.querySelector(`.${j}p${n}`);
            if (mat[indx][`${j}p${n}`] === 1 && tmpc.c < 56) {
                tmpc.children[0].innerText = ``;
            }
        }
    }
}
function teamup() {
    let j = pc[p][0];
    let indx = chld.c;
    let nc = 1;
    for (let n = 1; n <= 4; n++) {
        let tmpc = document.querySelector(`.${j}p${n}`);
        if (mat[indx][`${j}p${n}`] === 1 && tmpc.c <= 56 && tmpc.className !== chld.className) {
            nc++;
        }
    } if (nc > 1) {
        for (let n = 1; n <= 4; n++) {
            let tmpc = document.querySelector(`.${j}p${n}`);
            if (mat[indx][`${j}p${n}`] === 1 && tmpc.c <= 56) {
                tmpc.children[0].innerText = `${nc}`;
            }
        }
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
                mat[indx][`${j}p${n}`] = 0;
                if (dbg) {
                    console.log(`${tmpc.className} taken by ${chld.className}`);
                }
                let tmpp = tmpc.parentElement;
                tmpp.removeChild(tmpc);
                tmpp.data[n - 1] = 0;
                let tmprp = document.querySelector(`#${j}p${n}`);
                let tmprc = document.createElement('div');
                tmprc.id = `${j}pi${n}`;
                tmprp.appendChild(tmprc);
                pt = 1;
                takec(j, indx);
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
            let newChild = document.createElement('div');
            newChild.style.backgroundColor = `${pc[p]}`;
            chld.appendChild(newChild);
            chld.className = `${c}` + 'p' + `${i}`;
            if (dbg) {
                console.log(`${chld.className} came out`);
            }
            chld.style.zIndex = `16`;
            document.getElementById(`${c}p${i}`).removeChild(document.getElementById(`${c}pi${i}`));
            rn = 0;
            rd = 1;
            // dice.classList.add('pulse');
            ////
            chld.c = 0;
            chld.x = 0;
            chld.y = 0;
            chld.addEventListener('click', () => {
                chld = document.querySelector(`.${c}p${i}`);
                if (pc[p] === chld.children[0].style.backgroundColor && (chld.c + rn) <= 56 && rn > 0) {
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
            mat[0][chld.className] = 1;
            teamup();
            break;
        }
    }
    if (debugdice) { dice.click(); }
}
function gnrtnum() {//generates random num b/w 1 to 6
    rn = Math.floor(Math.random() * 6) + 1;
    //change face of the dice or roll dice

    let randomX = 720 + Math.floor(Math.random() * 180);
    let randomY = 720 + Math.floor(Math.random() * 180);

    dice.style.transition = "transform 0.75s ease-in";
    dice.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg)`;

    setTimeout(rolldice, 751);

}
function rolldice() {
    let xr = 0, yr = 0;

    switch (rn) {
        case 1: xr = 0; yr = 0; break;
        case 2: xr = 0; yr = 90; break;
        case 3: xr = 90; yr = 0; break;
        case 4: xr = -90; yr = 0; break;
        case 5: xr = 0; yr = -90; break;
        case 6: xr = 180; yr = 0; break;
    }

    // Apply the final position
    dice.style.transition = "transform 0.75s ease-out";
    dice.style.transform = `rotateX(${xr}deg) rotateY(${yr}deg)`;
    setTimeout(checklmts, 751);
}
function checklmts() {// check the limits of the piece with rn
    if (dbg) {
        console.log('dice rolled:', rn);
    }
    let cc = 0, c = pc[p][0];//cc: change color or player
    prnt = document.querySelector(`.${c}s`);
    if (chld) {
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
            cc = 1;
        } else if ((cm + stlin) === 4 && rn === 6) {
            rn = 0;
            rd = 1;
            // dice.classList.add('pulse');
            ////
            if (debugdice) {
                dice.click();
            }
        }
    } else {
    }
    if (rn === 6) {
        if (prnt.childElementCount === 0 || (prnt.childElementCount === prnt.r && prnt.r < 4) || (debugplyr && ec === 1 && prnt.childElementCount < 4)) {
            pieceout();
        } else if (prnt.childElementCount > 0) {
            onlymove();
        }
    } else if (rn !== 0) {
        if (prnt.childElementCount === 0) {
            cc = 1;
        } else {
            onlymove();
        }
    }
    if (cc === 1) {
        if (dbg) {
            console.log('cant move pieces for', rn);
        }
        cc = 0;
        chngplayer();
    }
}

const fullScreenButton = document.getElementById('fullscreen');
const enterSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/></svg>`;
const exitSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z"/></svg>`;

fullScreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            alert(`Error attempting to enable fullscreen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
});

document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        fullScreenButton.innerHTML = exitSVG;
    } else {
        fullScreenButton.innerHTML = enterSVG;
    }
});