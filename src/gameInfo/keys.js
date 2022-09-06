import notesCSSandData from './notesCSSandData.js';


const { a, b, c, d, e, f, g, aSharpBFlat, cSharpDflat, dSharpEflat, fSharpGflat, gSharpAflat } = notesCSSandData;

// Keys are based on major scale. Come back and generate key with loop
const keys = {
    Ckey: [ c, d, e, f, g, a, b ],
    Dkey: [d, e, fSharpGflat, g, a, b, cSharpDflat],
    EKey: [e, fSharpGflat, gSharpAflat, a, b, cSharpDflat, dSharpEflat],
    Fkey: [f, g, a, aSharpBFlat, c, d, e],
    Gkey: [g, a, b, c, d, e, fSharpGflat],
    Akey: [a, b, cSharpDflat, d, e, fSharpGflat, gSharpAflat],
    BKey: [b, cSharpDflat, dSharpEflat, e, fSharpGflat, gSharpAflat, aSharpBFlat],
    // add the sharp and flat keys
}


export default keys