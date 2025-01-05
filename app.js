let cnt=0,go = 0, x = 0, y = 0, k = 0, p = 0, rd = 1, rn = 6, mp = 0, ec = 0, pc = ["blue", "red", "green", "yellow"], wc = ["blue", "red", "green", "yellow"];
//g0:no of players to the final, rl:roll dice flag, pc:player color, rn:random number, x&y:coordinates, p:indeces of pc, k:step(1-57), mp:piece flag 
const turn = document.getElementById("turn");
const dice = document.getElementById("dice");
const b3 = document.getElementById("b3");
let chld = document.querySelector('body');
let prnt = document.querySelector('body');
prnt.data = 0;
chld.c = -1;
dice.addEventListener('click', () => {
    if (rd === 1) {
        rd = 0;
        dice.style.animation = "dice-rotate 0.4s ease-in-out";
        setTimeout(changef, 200);
        dice.addEventListener('animationend', () => {
            dice.style.animation = "";
        }, { once: true });
    }
    if (ec === 1) {
        if (chld) {  // Check if chld is not null or undefined
            //console.log(chld);
            chld.click();
        } else {
            //console.log("chld is null or undefined");
        }
    }

});
function changep() {
    p++;
    if (p === 4) {
        p = 0;
    }
    turn.innerText = `${pc[p]}'s turn`;
    //console.log(turn.innerText);
    turn.style.color = pc[p];
    let c = pc[p][0];
    chld = document.querySelector(`.${c}p1`);
    rd = 1;
}
function findcord() {//for blue
    if (k < 57 && k <= (chld.c + rn) && 57 > (chld.c + rn)) {
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
        setTimeout(movep, 10);
    }
}
function movep() {
    let xp = x * 15;
    let yp = y * 15;
    chld.x += xp;
    chld.y += yp;
    chld.style.transform = `translate(${chld.x}px, ${chld.y}px)`;
    k++;
    if (k < 57 && k <= (chld.c + rn) && 57 > (chld.c + rn)) {
        setTimeout(findcord, 10);
    } else {
        if (chld) {  // Add this check if chld is being used here
            chld.c += rn;
            if(chld.c===56){
                cnt++;
                console.log(`${cnt}.${chld.style.backgroundColor}`);
                if(cnt===3){
                    console.log('game over');
                    go=1;
                }
            }
            // console.log(chld.c);
            if (rn !== 6) {
                changep(); // check after
            } else {
                md = 1;
            }
        } else {
            //console.log("chld is null or undefined");
        }
        rn = 0;
        rd = 1;
        dice.click();
    }

    //console.log("c:", chld.c, "x:", chld.x, "y:", chld.y);
}
function createp() {
    mp = 0;
    rd = 1;
    let c = pc[p][0];
    prnt = document.querySelector(`.${c}s`);
    prnt.data = [0, 0, 0, 0];
    for (let i = 1; i <= 4; i++) {
        if (prnt.data[i] === 0) {
            prnt.data[i] = 1;
            chld = document.createElement('div');
            chld.className = `${c}` + 'p' + `${i}`;
            //console.log(`${c}p${i} out`);
            chld.style.backgroundColor = `${pc[p]}`;
            chld.c = 0;
            chld.x = 0;
            chld.y = 0;
            chld.addEventListener('click', () => {
                chld = document.querySelector(`.${c}p${i}`);
                // if (chld.className[0] === pc[p][0] && mp === 1 && rn !== 0) {
                // console.log("c:", chld.c, "x:", chld.x, "y:", chld.y);
                k = 0;
                if (chld.c > -1) {
                    k = chld.c + 1;
                }
                setTimeout(findcord, 400);
                // } else {
                //     console.log("Invlaid");
                // }
            });
            prnt.appendChild(chld);
            ec = 1;
            break;
        } else if (i === 4) {
            //console.log("all out");
        }
    }
    dice.click();
}
function changef() {
    if (go === 0) {
        let c = pc[p][0];
        prnt = document.querySelector(`.${c}s`);
        rn = Math.floor(Math.random() * 6) + 1;
        if (chld) {
            // console.log(chld.c);
            if (chld.c === 56) {
                if (wc.includes(chld.style.backgroundColor)) {
                    wc = wc.filter(value => value !== chld.style.backgroundColor);
                    // console.log(wc); // Output: [1, 2, 4, 5]
                    if (wc.length === 1) {
                        go = 1;
                    }
                }
            }
            if ((chld.c + rn) > 56 || chld.c === 56) {
                changep();
                dice.click();
            }
        }
        // console.log("dice:", rn);
        if (rn === 6) {
            if (prnt.childElementCount === 0) {
                createp();
            } else if (prnt.childElementCount > 0) {
                mp = 1;
            }
        } else {
            mp = 1;
            if (prnt.childElementCount === 0) {
                changep();
                rd = 1;
                dice.click();
            }
        }
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
    }
}
