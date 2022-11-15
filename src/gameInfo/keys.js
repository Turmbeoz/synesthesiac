import notesCSSandData from './notesCSSandData.js';


const { a, b, c, d, e, f, g, aSharpBFlat, cSharpDflat, dSharpEflat, fSharpGflat, gSharpAflat } = notesCSSandData;


// Chords

const chords = {
    aChord: { maj: { name: "A Major", notes: [a, cSharpDflat, e], buttonBools: [0, 2, 4]}, min: { name: "A Minor", notes: [a, c, e], buttonBools: [0, 2, 4]} },
    bChord: { maj: { name: "B Major", notes: [b, dSharpEflat, fSharpGflat], buttonBools: [1, 3, 5]}, min: { name: "B Minor", notes: [b, d, fSharpGflat], buttonBools: [1, 3, 5]} },
    cChord: { maj: { name: "C Major", notes: [c, e, g], buttonBools: [2, 4, 6]}, min: { name: "C Minor", notes: [c, dSharpEflat, g], buttonBools: [2, 4, 6]} },
    dChord: { maj: { name: "D Major", notes: [d, a, fSharpGflat], buttonBools: [0, 3, 5]}, min: { name: "D Minor", notes: [d, a, f], buttonBools: [0, 3, 5]} },
    eChord: { maj: { name: "E Major", notes: [e, b, gSharpAflat], buttonBools: [1, 4, 6]}, min: { name: "E Minor", notes: [e, b, g], buttonBools: [1, 4, 6]} },
    fChord: { maj: { name: "F Major", notes: [f, a, c], buttonBools: [0, 2, 5]}, min: { name: "F Minor", notes: [f, gSharpAflat, c], buttonBools: [0, 2, 5]} },
    gChord: { maj: { name: "G Major", notes: [g, b, d], buttonBools: [1, 3, 6]}, min: { name: "G Minor", notes: [g, aSharpBFlat, d], buttonBools: [1, 3, 6]} },

}

// Keys are based on major scale. Come back and generate key with loop
const keys = {
    Ckey: [a, b, c, d, e, f, g],
    Dkey: [a, b, cSharpDflat, d, e, fSharpGflat, g],
    EKey: [a, b, cSharpDflat, dSharpEflat, e, fSharpGflat, gSharpAflat],
    Fkey: [a, aSharpBFlat, c, d, e, f, g],
    Gkey: [a, b, c, d, e, fSharpGflat, g],
    Akey: [a, b, cSharpDflat, d, e, fSharpGflat, gSharpAflat],
    BKey: [aSharpBFlat, b, cSharpDflat, dSharpEflat, e, fSharpGflat, gSharpAflat],
    chords: chords
    // add the sharp and flat keys
}


const keysORDERED = {
    Ckey: [ c, d, e, f, g, a, b ],
    Dkey: [d, e, fSharpGflat, g, a, b, cSharpDflat],
    Ekey: [e, fSharpGflat, gSharpAflat, a, b, cSharpDflat, dSharpEflat],
    Fkey: [f, g, a, aSharpBFlat, c, d, e],
    Gkey: [g, a, b, c, d, e, fSharpGflat],
    Akey: [a, b, cSharpDflat, d, e, fSharpGflat, gSharpAflat],
    BKey: [b, cSharpDflat, dSharpEflat, e, fSharpGflat, gSharpAflat, aSharpBFlat],
    // add the sharp and flat keys
}


export default keys


// const chordsSig = {
//     a:[0, 2, 4],
//     ab:[],
//     b:[],
//     c:[],
//     cd:[],
//     d:[],
//     de:[],
//     e:[],
//     f:[],
//     fg:[],
//     g:[],
//     ga:[],
// }