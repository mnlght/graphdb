// ставим пакет uuid
// итоговый массив команд
const fs = require('fs');

const ca = ['CREATE'];
// абсолютное число всего
const ac = 1000;
// число связей всего со всем
const lc = 5;
// массив пользователей
const ua = [];
// массив фильмов
const fa = [];
// массив актёров
const aa = [];
const ja = ['comedy', 'horror', 'thriller', 'detective', 'action', 'art'];

// создаём юзеров
for (let i = 0; i <= ac; i++) {
    // сгенерированный uuid
    const name = `user_${i}`;
    ua.push(name);
    ca.push(`(${name}: Person {name:'${name}'}),`);
}
// создаём фильмы
for (let i = 0; i <= ac; i++) {
    // сгенерированный uuid
    const name = `movie_${i}`;
    fa.push(name);
    ca.push(`(${name}: Movie {name:'${name}'}),`);
}
// создаём актеров
for (let i = 0; i <= ac; i++) {
    // сгенерированный uuid
    const name = `actor_${i}`;
    aa.push(name);
    ca.push(`(${name}: Actor {name:'${name}'}),`);
}
// создаём жанры
for (const j of ja) {
    ca.push(`(${j}: Genre {name:'${j}'}),`);
}
// привязываем жанры к фильмам
for (const m of fa) {
    const g = ja[getRandomInt(0, 6)];
    ca.push(`(${m}) -[:HAS_GENRE]-> (${g}),`);
}
// привязываем актеров к фильмам
for (const a of aa) {
    const tmpM = [];
    let i = 0;
    do {
        const m = fa[getRandomInt(0, ac)];
        if (!tmpM.includes(m)) {
            ca.push(`(${m}) -[:HAS_ACTOR]-> (${a}),`);
            tmpM.push(m);
            i += 1;
        }
    } while (i < lc);
}
// дружим юзеров
for (const u of ua) {
    const tmpM = [];
    let i = 0;
    do {
        const m = ua[getRandomInt(0, ac)];
        if (!tmpM.includes(m)) {
            ca.push(`(${u}) -[:IS_FRIEND]-> (${m}),`);
            tmpM.push(m);
            i += 1;
        }
    } while (i < lc);
}
// знакомим юзеров с актерами
for (const u of ua) {
    const tmpM = [];
    let i = 0;
    do {
        const m = aa[getRandomInt(0, ac)];
        if (!tmpM.includes(m)) {
            ca.push(`(${u}) -[:IS_SIGN]-> (${m}),`);
            tmpM.push(m);
            i += 1;
        }
    } while (i < lc);
}
// смотрим фильмы
for (const u of ua) {
    const tmpM = [];
    let i = 0;
    do {
        const m = fa[getRandomInt(0, ac)];
        if (!tmpM.includes(m)) {
            ca.push(`(${u}) -[:WATCHED]-> (${m}),`);
            tmpM.push(m);
            i += 1;
        }
    } while (i < lc);
}

const ls = ca.join('\n');

fs.writeFileSync('qwe.txt', ls);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}