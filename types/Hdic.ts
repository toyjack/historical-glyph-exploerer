export interface HdicTsj {
  TSJ2ID: string;
  Entry_word: string;
  SJ_def: string;
  SJ_wakun: string;
  SJ_research: string;
  remarks: string;
  tsj: Tsj[];
}

export interface Tsj {
  SJID: string;
  SJ2ID: string;
  SJ_Rinsen: string;
  SJ_vol_radical: string;
  SJ_radical: string;
  Entry: string;
  Entry_original: string;
  UCShex: string;
  SJ_part: string;
  SJ_source: string;
  SJ_remarks: string;
  SJ_img_filename: string;
  SYID: string;
  TBID: string;
  SGID1: string;
  SGID2: string;
  SGID3: string;
  SGID4: string;
  dic_name: string;
  KW_def: string;
  not_inputable: string;
  Entry_fixed: string;
}

export interface HdicSyp {
  SYID: string;
  SY_vol_radical: string;
  SY_radical: string;
  Entry: string;
  Entry_original: string;
  unicode: string;
  SY_def: string;
  KSY_diff: string;
}

export interface HdicKtb {
  TBID: string;
  TB_vol_radical: string;
  TB_radical: string;
  Entry: string;
  Entry_type: string;
  Entry_diff: string;
  TB_def: string;
  SYID: string;
  YYID: string;
  TB_remarks: string;
}


export interface HdicSyp {
  SYID: string;
  SY_vol_radical: string;
  SY_radical: string;
  Entry: string;
  Entry_original: string;
  unicode: string;
  SY_def: string;
  KSY_diff: string;
}

export interface HdicKtb {
  TBID: string;
  TB_vol_radical: string;
  TB_radical: string;
  Entry: string;
  Entry_type: string;
  Entry_diff: string;
  TB_def: string;
  SYID: string;
  YYID: string;
  TB_remarks: string;
}
