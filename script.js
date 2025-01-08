console.log(`Blue's turn`);

let cc = 0, oor = 0, cnt = 0, x = 0, y = 0, k = 0, p = 0, rd = 1, rn = 6, mp = 0, ec = 0, pc = ["blue", "red", "green", "yellow"], wc = ["blue", "red", "green", "yellow"];
let pt = 0;
//pc:player color, rn:random number, x&y:coordinates, p:indeces of pc, k:step(1-57)

let chldc = 0;

let chlda = [];

const turn = document.getElementById("turn");
const dice = document.getElementById("dice");
const b3 = document.getElementById("b3");

let chld = document.querySelector('body');
let prnt = document.querySelector('body');

chld.c = -1;
let debugdice = false;
let debugplyr = false;

//debug code start
document.getElementById("center").addEventListener('click', () => {
    if (debugdice === false) {
        debugdice = true;
        dice.click();
        dice.style.pointerEvents = 'none';
    } else {
        debugdice = false;
        dice.style.pointerEvents = 'all';
    }
});
document.querySelector("header").addEventListener('click', () => {
    if (debugplyr === false) {
        debugplyr = true;
        // document.querySelector("#board").style.pointerEvents = 'none';
    } else {
        debugplyr = false;
        // document.querySelector("#board").style.pointerEvents = 'all';
    }
});
//debug code end

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
        document.getElementById(`${pc[i]}`).addEventListener('click', () => {
            if (rn === 6 && prnt.childElementCount < 4) {
                pieceout();
            }
        });
    }
}
Initialize();

dice.addEventListener('click', () => {
    dice.style.animation = "dice-rotate 0.1s ease-in-out";
    // disablePieceClicks(); // Disable piece clicks

    setTimeout(() => {
        gnrtnum(); // Update rn
        // enablePieceClicks(); // Enable piece clicks after rn is updated
    }, 100);

    dice.addEventListener('animationend', () => {
        dice.style.animation = "";
    }, { once: true });

    trydebugplyr(); // Call after dice number is updated
    
});

function disablePieceClicks() {
    document.querySelectorAll('.piece').forEach(piece => {
        piece.style.pointerEvents = 'none';
    });
}

function enablePieceClicks() {
    document.querySelectorAll('.piece').forEach(piece => {
        piece.style.pointerEvents = 'all';
    });
}

function trydebugplyr(){
    if (debugplyr && ec === 1) {
        if (chldc > 0) {
            console.log(chld.className); // Check if chld is not null or undefined
            if (debugplyr) { chld.click(); }

            //player debugging starts here
            console.log(`chldc: ${chldc}`);
            // if (chldc > 0) {
            //     if (chldc === 1) {
            //         if (debugplyr) chld.click();
            //     } else if (chldc === 2) {
            //         if ((chlda[0].c + rn) === 56) {
            //             chlda[0].click();
            //         } else if ((chlda[1].c + rn) === 56) {
            //             chlda[1].click();
            //         } else if ((chlda[0].c + rn) > 56) {
            //             if ((chlda[1].c + rn) < 56) {
            //                 chlda[1].click();
            //             }
            //         } else if ((chlda[1].c + rn) > 56) {
            //             if ((chlda[0].c + rn) < 56) {
            //                 chlda[0].click();
            //             }
            //         } else {
            //             chld.click();
            //         }
            //     } else if (chldc === 3) {
            //         for (let i = 0; i < 3; i++) {
            //             if ((chlda[i].c + rn) === 56) {
            //                 chlda[i].click();
            //                 break;
            //             }
            //         }
            //         let moved = false;
            //         for (let i = 0; i < 3; i++) {
            //             if (!moved && (chlda[i].c + rn) < 56) {
            //                 chlda[i].click();
            //                 moved = true;
            //             }
            //         }
            //         if (!moved) {
            //             chld.click();
            //         }
            //     } else if (chldc === 4) {
            //         for (let i = 0; i < 4; i++) {
            //             if ((chlda[i].c + rn) === 56) {
            //                 chlda[i].click();
            //                 break;
            //             }
            //         }
            //         let moved = false;
            //         for (let i = 0; i < 4; i++) {
            //             if (!moved && (chlda[i].c + rn) < 56) {
            //                 chlda[i].click();
            //                 moved = true;
            //             }
            //         }
            //         if (!moved) {
            //             chld.click();
            //         }
            //     }
            // }

            //player debugging ended here
        }
    }
}

let flickTimeout; // Store the timeout ID for flickering

function chngplayer() { // Change player
    p = (p + 1) % 4;
    turn.innerText = ``;
    // turn.innerText = `${pc[p]}'s turn`;
    if (oor === 1) {
        console.log(`changed from ${chld.style.backgroundColor} to ${pc[p]}`);
    }
    console.log(`${pc[p]}'s turn`);
    turn.style.color = pc[p];
    stopFlicker(); // Stop any ongoing flickering
    flickw(); // Start new flickering cycle
    chngz();
    if (debugdice) { dice.click(); }
    oor = 0;
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
    for (let i = 0; i < 4; i++) {
        if (i === p) {
            document.getElementById(`${pc[i]}`).style.pointerEvents = 'all';
        } else {
            document.getElementById(`${pc[i]}`).style.pointerEvents = 'none';
        }
        for (let j = 0; j < 4; j++) {
            let tchld = document.querySelector(`.${pc[i][0]}p${j}`);
            if (tchld) {
                if (i === p) {
                    tchld.style.zIndex = '3';
                    tchld.style.pointerEvents = 'all';
                    chld = tchld;
                    chlda[chldc] = tchld;
                    chldc++;
                } else {
                    tchld.style.zIndex = '2';
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
                let i=0;
                for(i=0;i<4;i++){
                    let tchld = document.querySelector(`.${pc[p][0]}p${i}`);
                    if(tchld&&(tchld.c!==56)){
                        break;
                    }
                }
                if(i===4){
                    cnt++;
                    console.log(`${cnt}.${pc[p]}`);
                }
                if(cnt===3){
                    console.log('game over');
                    return;
                }
            }
            if (rn !== 6 && pt === 0) {
                chngplayer(); // check after
                dch = 1;
            }
            rn=0;//changed rn
        }
        if (dch === 0) {
            if (debugdice) { dice.click(); }
        } //maybe check ln 85 multiple clicks
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
            if (mat[indx][`${j}p${n}`] === 1) {
                console.log(` ${j}p${n} taken by ${chld.className}`);
                mat[indx][`${j}p${n}`] = 0;
                let tmpc = document.querySelector(`.${j}p${n}`);
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
            document.getElementById(`${c}p${i}`).removeChild(document.getElementById(`${c}pi${i}`));
            console.log(`${chld.className} came out`);
            chld.c = 0;
            chld.x = 0;
            chld.y = 0;
            chld.addEventListener('click', () => {
                if (turn.style.color === chld.style.backgroundColor && (chld.c + rn) <= 56) {
                    console.log(`${chld.className} clicked`);
                    chld = document.querySelector(`.${c}p${i}`);
                    k = 0;
                    if (chld.c > -1) {
                        k = chld.c + 1;
                    }
                    setTimeout(findcord, 50);
                }
            });
            prnt.appendChild(chld);
            ec = 1;//element created or exists
            break;
        } else if (i === 4) {
            //console.log("all out");
        }
    }
    chldc++;
    if (debugdice) { dice.click(); }
    // if (debugplyr) { chld.click(); }
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

function checklmts() {
    let c = pc[p][0];
    prnt = document.querySelector(`.${c}s`);
    if (chld) {
        if ((chld.c + rn) === 56) {
            cc = 0;
            console.error(`${chld.className} reached destination`);
        } else if ((chld.c + rn) > 56 || chld.c === 56) {
            console.error(`can't move ${chld.className}`);
            oor = 1;
            cc = 1;
        }
    }
    if (rn === 6) {
        if (prnt.childElementCount === 0) {
            pieceout();
        } else if (prnt.childElementCount > 0) {
            // console.log('yes');
        }
    } else {
        if (prnt.childElementCount === 0) {
            cc = 1;
        }
    }
    if (cc === 1) {
        cc = 0;
        chngplayer();
    }
}
