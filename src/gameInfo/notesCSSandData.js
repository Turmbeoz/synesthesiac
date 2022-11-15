import lightninA from '../assets/lightning_colors/lightninBOTHENDS_A.png';
import lightninAB from '../assets/lightning_colors/lightninBOTHENDS_AsBf.png';
import lightninB from '../assets/lightning_colors/lightninBOTHENDS_B.png';
import lightninC from '../assets/lightning_colors/lightninBOTHENDS_C.png';
import lightninCD from '../assets/lightning_colors/lightninBOTHENDS_CsDf.png';
import lightninD from '../assets/lightning_colors/lightninBOTHENDS_D.png';
import lightninDE from '../assets/lightning_colors/lightninBOTHENDS_DsEf.png';
import lightninE from '../assets/lightning_colors/lightninBOTHENDS_E.png';
import lightninF from '../assets/lightning_colors/lightninBOTHENDS_F.png';
import lightninFG from '../assets/lightning_colors/lightninBOTHENDS_FsGf.png';
import lightninG from '../assets/lightning_colors/lightninBOTHENDS_G.png';
import lightninGA from '../assets/lightning_colors/lightninBOTHENDS_GsAf.png';
import lightninBW from '../assets/lightning_colors/lightninBOTHENDSBW.png';
import splosion from '../assets/explosions/splosionGRAY.png';

import splosionA from "../assets/explosions/splosionA.png"
import splosionB from "../assets/explosions/splosionB.png"
import splosionC from "../assets/explosions/splosionC.png"
import splosionD from "../assets/explosions/splosionD.png"
import splosionE from "../assets/explosions/splosionE.png"
import splosionF from "../assets/explosions/splosionF.png"
import splosionG from "../assets/explosions/splosionG.png"
import splosionGA from "../assets/explosions/splosionGsAf.png"
import splosionFG from "../assets/explosions/splosionFsGf.png"
import splosionDE from "../assets/explosions/splosionDsEf.png"
import splosionCD from "../assets/explosions/splosionCsDf.png"
import splosionAB from "../assets/explosions/splosionAsBf.png"

import aListener from "../assets/audio/listeners/a-listener.mp3"
import bListener from "../assets/audio/listeners/b-listener.mp3"
import cListener from "../assets/audio/listeners/c-listener.mp3"
import dListener from "../assets/audio/listeners/d-listener.mp3"
import eListener from "../assets/audio/listeners/e-listener.mp3"
import fListener from "../assets/audio/listeners/f-listener.mp3"
import gListener from "../assets/audio/listeners/g-listener.mp3"



import abListener from "../assets/audio/listeners/ab-listener.mp3"
import cdListener from "../assets/audio/listeners/cd-listener.mp3"
import deListener from "../assets/audio/listeners/de-listener.mp3"
import fgListener from "../assets/audio/listeners/fg-listener.mp3"
import gaListener from "../assets/audio/listeners/ga-listener.mp3"


import AexplodeSound from "../assets/audio/exploders/Aexplosive.mp3"
import ABexplodeSound from "../assets/audio/exploders/ABexplosive.mp3"
import BexplodeSound from "../assets/audio/exploders/Bexplosive.mp3"
import CexplodeSound from "../assets/audio/exploders/Cexplosive.mp3"
import CDexplodeSound from "../assets/audio/exploders/CDexplosive.mp3"
import DexplodeSound from "../assets/audio/exploders/Dexplosive.mp3"
import DEexplodeSound from "../assets/audio/exploders/DEexplosive.mp3"
import EexplodeSound from "../assets/audio/exploders/Eexplosive.mp3"
import FexplodeSound from "../assets/audio/exploders/Fexplosive.mp3"
import FGexplodeSound from "../assets/audio/exploders/FGexplosive.mp3"
import GexplodeSound from "../assets/audio/exploders/Gexplosive.mp3"
import GAexplodeSound from "../assets/audio/exploders/GAexplosive.mp3"


import AnoteChange from "../assets/audio/noteChangers/a_note_change.mp3"
import ABnoteChange from "../assets/audio/noteChangers/ab_note_change.mp3"
import BnoteChange from "../assets/audio/noteChangers/b_note_change.mp3"
import CnoteChange from "../assets/audio/noteChangers/c_note_change.mp3"
import CDnoteChange from "../assets/audio/noteChangers/cd_note_change.mp3"
import DnoteChange from "../assets/audio/noteChangers/d_note_change.mp3"
import DEnoteChange from "../assets/audio/noteChangers/de_note_change.mp3"
import EnoteChange from "../assets/audio/noteChangers/e_note_change.mp3"
import FnoteChange from "../assets/audio/noteChangers/f_note_change.mp3"
import FGnoteChange from "../assets/audio/noteChangers/fg_note_change.mp3"
import GnoteChange from "../assets/audio/noteChangers/g_note_change.mp3"
import GAnoteChange from "../assets/audio/noteChangers/ga_note_change.mp3"

const notesCSSandData = {
    a: {stringVer: 'A', png: lightninA, hex: '#ff0000', exploder: splosionA, listenerMP3: aListener, explodeAudio: AexplodeSound},

    aSharpBFlat: {stringVer: 'AB', png: lightninAB, hex: '#ff4500', exploder: splosionAB, listenerMP3: abListener, explodeAudio: ABexplodeSound},

    b: {stringVer: 'B', png: lightninB, hex: '#ffa500', exploder: splosionB, listenerMP3: bListener, explodeAudio: BexplodeSound},

    c: {stringVer: 'C', png: lightninC, hex: '#ffff00', exploder: splosionC, listenerMP3: cListener, explodeAudio: CexplodeSound},

    cSharpDflat: {stringVer: 'CD', png: lightninCD, hex: '#9acd32', exploder: splosionCD, listenerMP3: cdListener, explodeAudio: CDexplodeSound },

    d: {stringVer: 'D', png: lightninD, hex: '#1BFA01', exploder: splosionD, listenerMP3: dListener, explodeAudio: DexplodeSound },

    dSharpEflat: {stringVer: 'DE', png: lightninDE, hex: '#008000', exploder: splosionDE, listenerMP3: deListener, explodeAudio: DEexplodeSound },

    e: {stringVer: 'E', png: lightninE, hex: '#0cbaa6', exploder: splosionE, listenerMP3: eListener, explodeAudio: EexplodeSound },

    f: {stringVer: 'F', png: lightninF, hex: '#0000ff', exploder: splosionF, listenerMP3: fListener, explodeAudio: FexplodeSound},

    fSharpGflat: {stringVer: 'FG', png: lightninFG, hex: '#8a2be2', exploder: splosionFG, listenerMP3: fgListener, explodeAudio: FGexplodeSound},

    g: {stringVer: 'G', png: lightninG, hex: '#ff69b4', exploder: splosionG, listenerMP3: gListener, explodeAudio: GexplodeSound },

    gSharpAflat: { stringVer: 'GA', png: lightninGA, hex: '#800080', exploder: splosionGA, listenerMP3: gaListener, explodeAudio: GAexplodeSound },
    
    defaultGray: { hex: '#CACACA'},

    deactiveGray: { hex: '#090909' },

    noteChangers: {
        "A": AnoteChange, 
        "AB": ABnoteChange, 
        "B": BnoteChange, 
        "C": CnoteChange,
        "CD": CDnoteChange,
        "D": DnoteChange,
        "DE": DEnoteChange,
        "E": EnoteChange,
        "F": FnoteChange,
        "FG": FGnoteChange,
        "G": GnoteChange,
        "GA": GAnoteChange,
    } 
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
// G Violet filter: invert(72%) sepia(51%) saturate(1190%) hue-rotate(239deg) brightness(96%) contrast(95%);  #ff69b4

// G# Ab Purple filter: invert(6%) sepia(94%) saturate(6084%) hue-rotate(298deg) brightness(114%) contrast(104%); #800080