import lightninA from '../assets/lightning_colors/lightninBOTHENDS_A.png';
import lightninAsBf from '../assets/lightning_colors/lightninBOTHENDS_AsBf.png';
import lightninB from '../assets/lightning_colors/lightninBOTHENDS_B.png';
import lightninC from '../assets/lightning_colors/lightninBOTHENDS_C.png';
import lightninCsDf from '../assets/lightning_colors/lightninBOTHENDS_CsDf.png';
import lightninD from '../assets/lightning_colors/lightninBOTHENDS_D.png';
import lightninDsEf from '../assets/lightning_colors/lightninBOTHENDS_A.png';
import lightninE from '../assets/lightning_colors/lightninBOTHENDS_E.png';
import lightninF from '../assets/lightning_colors/lightninBOTHENDS_F.png';
import lightninFsGf from '../assets/lightning_colors/lightninBOTHENDS_FsGf.png';
import lightninG from '../assets/lightning_colors/lightninBOTHENDS_G.png';
import lightninGsAf from '../assets/lightning_colors/lightninBOTHENDS_GsAf.png';
import lightninBW from '../assets/lightning_colors/lightninBOTHENDSBW.png';
import splosion from '../assets/explosions/splosionGRAY.png';

import splosionA from "../assets/explosions/splosionA.png"
import splosionB from "../assets/explosions/splosionB.png"
import splosionC from "../assets/explosions/splosionC.png"
import splosionD from "../assets/explosions/splosionD.png"
import splosionE from "../assets/explosions/splosionE.png"
import splosionF from "../assets/explosions/splosionF.png"
import splosionG from "../assets/explosions/splosionG.png"
import splosionGsAf from "../assets/explosions/splosionGsAf.png"
import splosionFsGf from "../assets/explosions/splosionFsGf.png"
import splosionDsEf from "../assets/explosions/splosionDsEf.png"
import splosionCsDf from "../assets/explosions/splosionCsDf.png"
import splosionAsBf from "../assets/explosions/splosionAsBf.png"

const notesCSSandData = {
    a: {stringVer: 'A', png: lightninA, hex: '#ff0000', exploder: splosionA },

    aSharpBFlat: {stringVer: 'AB', png: lightninAsBf, hex: '#ff4500', exploder: splosionAsBf },

    b: {stringVer: 'B', png: lightninB, hex: '#ffa500', exploder: splosionB },

    c: {stringVer: 'C', png: lightninC, hex: '#ffff00', exploder: splosionC },

    cSharpDflat: {stringVer: 'CD', png: lightninCsDf, hex: '#9acd32', exploder: splosionCsDf },

    d: {stringVer: 'D', png: lightninD, hex: '#1BFA01', exploder: splosionD },

    dSharpEflat: {stringVer: 'DE', png: lightninDsEf, hex: '#008000', exploder: splosionDsEf },

    e: {stringVer: 'E', png: lightninE, hex: '#0cbaa6', exploder: splosionE },

    f: {stringVer: 'F', png: lightninF, hex: '#0000ff', exploder: splosionF },

    fSharpGflat: {stringVer: 'FG', png: lightninFsGf, hex: '#8a2be2', exploder: splosionFsGf },

    g: {stringVer: 'G', png: lightninG, hex: '#ee82ee', exploder: splosionG },

    gSharpAflat: { stringVer: 'GA', png: lightninGsAf, hex: '#800080', exploder: splosionGsAf },
    
    defaultGray: { hex: '#CACACA'},

    deactiveGray: { hex: '#090909' }
}
export default notesCSSandData;


// A RED filter: invert(14%) sepia(83%) saturate(7052%) hue-rotate(359deg) brightness(92%) contrast(118%);   #ff0000
// A# Bb Red-Orange filter: invert(40%) sepia(76%) saturate(4805%) hue-rotate(360deg) brightness(100%) contrast(107%); #ff4500
// B Orange filter: invert(67%) sepia(38%) saturate(2827%) hue-rotate(359deg) brightness(101%) contrast(107%); #ffa500
// C Yellow-Orange filter: invert(75%) sepia(76%) saturate(675%) hue-rotate(325deg) brightness(101%) contrast(101%);  #ffae42
// C# Db Yellow filter: invert(88%) sepia(58%) saturate(765%) hue-rotate(1deg) brightness(106%) contrast(104%); #ffff00
// D Yellow-Green filter: invert(72%) sepia(8%) saturate(3195%) hue-rotate(38deg) brightness(101%) contrast(91%);  #9acd32
// D# Eb Green filter: invert(22%) sepia(96%) saturate(2118%) hue-rotate(99deg) brightness(101%) contrast(103%);  #008000
// E Blue-Green filter: invert(58%) sepia(61%) saturate(3754%) hue-rotate(137deg) brightness(99%) contrast(91%); #0cbaa6
// F Blue filter: invert(10%) sepia(100%) saturate(5057%) hue-rotate(244deg) brightness(99%) contrast(147%); #0000ff
// F# Gb Blue-Violet filter: invert(19%) sepia(91%) saturate(4530%) hue-rotate(269deg) brightness(93%) contrast(91%); #8a2be2
// G Violet filter: invert(72%) sepia(51%) saturate(1190%) hue-rotate(239deg) brightness(96%) contrast(95%);  #ee82ee

// G# Ab Purple filter: invert(6%) sepia(94%) saturate(6084%) hue-rotate(298deg) brightness(114%) contrast(104%); #800080