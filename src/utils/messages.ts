export enum ServerMessage {
  SET_CHAT_NAME = "setchatname",
  SET_AUTHOR_NOTE_TEMPLATE = "setanotetemplate",
  CONNECTED = "connected",
  RUNS_REMOTELY = "runs_remotely",
  ALLOW_SOFT_PROMPTS = "allowsp",
  STAT_SOFT_PROMPT_ITEMS = "spstatitems",
  SET_STORY_NAME = "setstoryname",
  SET_MEMORY = "setmemory",
  SET_AUTHOR_NOTE = "setanote",
  SET_GAME_STATE = "setgamestate",
  IS_EDIT_MODE = "editmode",
  IS_MEMORY_MODE = "memmode",
  IS_WORLD_INFO_MODE = "wimode",
  GAME_SAVED = "gamesaved",
  SET_LABEL_TEMP = "setlabeltemp",
  SET_LABEL_TO_PP = "setlabeltopp",
  SET_LABEL_TO_PK = "setlabeltopk",
  SET_LABEL_TFS = "setlabeltfs",
  SET_LABEL_TYPICAL = "setlabeltypical",
  SET_LABEL_TO_PA = "setlabeltopa",
  SET_LABEL_REPPEN = "setlabelreppen",
  SET_LABEL_REPPEN_SLOPE = "setlabelreppenslope",
  SET_LABEL_REPPEN_RANGE = "setlabelreppenrange",
  SET_LABEL_OUTPUT = "setlabeloutput",
  SET_LABEL_TOKEN_MAX = "setlabeltknmax",
  SET_LABEL_IK_GENERATION = "setlabelikgen",
  SET_LABEL_AUTHOR_NOTE_DEPTH = "setlabelanotedepth",
  SET_LABEL_NUMBER_SEQUENCE = "setlabelnumseq",
  SET_LABEL_WORLD_INFO_DEPTH = "setlabelwidepth",
  WORLD_INFO_EXPAND = "wiexpand",
  WORLD_INFO_EXPAND_FOLDER = "wiexpandfolder",
  WORLD_INFO_COLLAPSE_CONTENT = "wifoldercollapsecontent",
  WORLD_INFO_EXPAND_CONTENT = "wifolderexpandcontent",
  WORLD_INFO_UPDATE = "wiupdate",
  WORLD_INFO_UPDATE_FOLDER = "wifolderupdate",
  WORLD_INFO_SELECT = "wiselon",
  WORLD_INFO_DESELECT = "wiseloff",
  WORLD_INFO_CONSTANT_ENABLE = "wiconstanton",
  WORLD_INFO_CONSTANT_DISABLE = "wiconstantoff",
  WORLD_INFO_UPDATE_DEPTH = "updatewidepth",
  WORLD_INFO_ADD_ITEM = "addwiitem",
  WORLD_INFO_ADD_FOLDER = "addwifolder",
  WORLD_INFO_START = "wistart",
  WORLD_INFO_FINISH = "wifinish",
  BUILD_USER_SCRIPTS = "buildus",
  BUILD_SAMPLERS = "buildsamplers",
  SET_DEBUG = "set_debug",
  STAT_USER_SCRIPT_ITEMS = "usstatitem",
  UPDATE_SCREEN = "updatescreen",
  ADD_SETTING = "addsetting",
  ADD_FORMAT = "addformat",
  WARNING_MESSAGE = "warnmsg",
  SCROLL_DOWN = "scrolldown",
  TEXT_EFFECT = "texteffect",
  ERROR_MESSAGE = "errmsg",
  GENERATE_SEQUENCES = "genseqs",
  HIDE_GENERATE_SEQUENCES = "hidegenseqs",
  UPDATE_CHUNK = "updatechunk",
  REMOVE_CHUNK = "removechunk",
  ALLOW_TOGGLE = "allowtoggle",
  UPDATE_TEMP = "updatetemp",
  UPDATE_TO_PP = "updatetopp",
  UPDATE_TO_PK = "updatetopk",
  UPDATE_TFS = "updatetfs",
  UPDATE_TYPICAL = "updatetypical",
  UPDATE_TO_PA = "updatetopa",
  UPDATE_REPPEN = "updatereppen",
  UPDATE_REPPEN_SLOPE = "updatereppenslope",
  UPDATE_REPPEN_RANGE = "updatereppenrange",
  UPDATE_OUTPUT_LENGTH = "updateoutlen",
  UPDATE_TOKEN_MAX = "updatetknmax",
  UPDATE_SEQUENE_NUMBER = "updatenumseq",
  UPDATE_AUTHOR_NOTE_DEPTH = "updateanotedepth",
  UPDATE_USE_PROMPT = "updateusepropmt",
  UPDATE_ADVENTURE = "updateadventure",
  UPDATE_CHAT_MODE = "updatechatmode",
  UPDATE_AUTO_SAVE = "updateautosave",
  UPDATE_NO_PROMPT_GENERATION = "updatenopromptgen",
  UPDATE_RNG_PERSISTENCE = "updaterngpersist",
  UPDATE_NO_GENERATED_MODIFIERS = "updatenogenmod",
  UPDATE_FORMAT_TRIM_INC = "updatefrmttriminc",
  UPDATE_FORMAT_RMBLLN = "updatefrmtrmblln",
  UPDATE_FORMAT_TRMSPCH = "updatefrmtrmspch",
  UPDATE_FORMAT_ADSNSP = "updatefrmtadsnsp",
  UPDATE_SINGLE_LINE = "updatesingleline",
  SET_INPUT_TEXT = "setinputtext",
  ENABLE_SUBMIT = "enablesubmit",
  REQUEST_WORLD_INFO_ITEM = "requestwiitem",
  GET_AUTHOR_NOTE = "getanote",
  ASK_FOR_OVERWRITE = "askforoverwrite",
  HIDE_SAVE_AS = "hidesaveas",
  SAVE_AS = "saveas",
  BUILD_LOAD = "buildload",
  BUILD_SOFT_PROMPTS = "buildsp",
  HIDE_POPUP_DELETE = "hidepopupdelete",
  HIDE_POPUP_RENAME = "hidepopuprename",
  CLEAR_POPUP = "clearpopup",
  SHOW_POPUP = "popupshow",
  POPUP_ERROR = "popuperror",
  ADD_IMPORT_LINE = "addimportline",
  DEBUG_INFO = "debug_info",
  HIDE_MESSAGE = "hidemsg",
}

export enum ClientMessage {
  SUBMIT = "submit",
}

export type ServerValue = {
  [ServerMessage.SET_GAME_STATE]: {
    data: GameState;
  };
  [ServerMessage.UPDATE_CHUNK]: {
    data: {
      index: number;
      html: string;
    };
  };
  [ServerMessage.HIDE_MESSAGE]: undefined;
  [ServerMessage.TEXT_EFFECT]: {
    data: number;
  };
  [ServerMessage.SCROLL_DOWN]: undefined;
};

export type ClientValue = {
  [ClientMessage.SUBMIT]: {
    actionmode: ActionMode;
    allowabort: boolean;
    data: string;
  };
};

enum GameState {
  READY = "ready",
  WAIT = "wait",
}

enum ActionMode {
  STORY,
  ACTION,
}
