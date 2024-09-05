import {ESportType} from '@core/constants/enum/sport';
interface ELIMIT_AMOUNT_DATA {
  [key: string]: {
    [key: string]:{
      [key: string]:{
        [key: string]: number
      }
    }
  };
}
const enum GAME_TYPE {
  RUNING = 1,
  UNRUNING
}
const FOOTBALL = [
  {l: 1, range: [1, 23]},
  {l: 2, range: [24, 34]},
  {l: 3, range: [35, 50]},
  {l: 4, range: [51, 65]},
  {l: 5, range: [66, 72]},
  {l: 6, range: [73, 85]},
  {l: 7, range: [86, 98]},
  {l: 8, range: [99, 111]},
  {l: 9, range: [112, 124]},
  {l: 10, range: [125, 137]},
  {l: 11, range: [138, 149]},
  {l: 12, range: [150, 162]},
  {l: 13, range: [163, 175]},
  {l: 14, range: [176, 188]},
  {l: 15, range: [189, 200]},
];
const BASKETBALL= [
  {l: 1, range: [1, 6]},
  {l: 2, range: [7, 16]},
  {l: 3, range: [17, 23]},
  {l: 4, range: [24, 28]},
  {l: 5, range: [29, 35]},
  {l: 6, range: [36, 40]},
  {l: 7, range: [41, 47]},
  {l: 8, range: [48, 54]},
  {l: 9, range: [55, 60]},
  {l: 10, range: [61, 69]},
  {l: 11, range: [70, 75]},
  {l: 12, range: [76, 80]},
  {l: 13, range: [81, 85]},
  {l: 14, range: [86, 92]},
  {l: 15, range: [93, 100]},
];
const DATA: ELIMIT_AMOUNT_DATA = {
  [ESportType.FOOTBALL.toString()]: {
    [GAME_TYPE.RUNING]: {
      // 让球
      'FT_AH,HT_AH': {
        '1': 400000,
        '2': 280000,
        '3': 120000,
        '4': 80000,
        '5': 60000,
        '6': 60000,
        '7': 50000,
        '8': 40000,
        '9': 40000,
        '10': 20000,
        '11': 20000,
        '12': 10000,
        '13': 10000,
        '14': 10000,
        '15': 10000,
        '16': 30000,
        'spare': 30000,
      },
      // 大小
      'FT_OU,HT_OU': {
        '1': 600000,
        '2': 420000,
        '3': 180000,
        '4': 120000,
        '5': 90000,
        '6': 90000,
        '7': 80000,
        '8': 60000,
        '9': 60000,
        '10': 20000,
        '11': 20000,
        '12': 20000,
        '13': 10000,
        '14': 10000,
        '15': 10000,
        '16': 30000,
        'spare': 30000,
      },
      // 独赢
      'FT_1X2,HT_1X2': {
        '1': 400000,
        '2': 280000,
        '3': 120000,
        '4': 80000,
        '5': 60000,
        '6': 60000,
        '7': 50000,
        '8': 40000,
        '9': 40000,
        '10': 20000,
        '11': 20000,
        '12': 10000,
        '13': 10000,
        '14': 10000,
        '15': 10000,
        '16': 30000,
        'spare': 30000,
      },
    },
    [GAME_TYPE.UNRUNING]: {
      // 让球
      'FT_AH,HT_AH': {
        '1': 300000,
        '2': 240000,
        '3': 150000,
        '4': 120000,
        '5': 100000,
        '6': 60000,
        '7': 50000,
        '8': 40000,
        '9': 30000,
        '10': 20000,
        '11': 10000,
        '12': 5000,
        '13': 5000,
        '14': 5000,
        '15': 5000,
        'spare': 5000,
      },
      // 大小
      'FT_OU,HT_OU': {
        '1': 450000,
        '2': 360000,
        '3': 230000,
        '4': 180000,
        '5': 150000,
        '6': 60000,
        '7': 50000,
        '8': 40000,
        '9': 30000,
        '10': 20000,
        '11': 10000,
        '12': 5000,
        '13': 5000,
        '14': 5000,
        '15': 5000,
        'spare': 5000,
      },
      // 独赢
      'FT_1X2,HT_1X2': {
        '1': 300000,
        '2': 240000,
        '3': 150000,
        '4': 120000,
        '5': 100000,
        '6': 60000,
        '7': 50000,
        '8': 40000,
        '9': 30000,
        '10': 20000,
        '11': 10000,
        '12': 5000,
        '13': 5000,
        '14': 5000,
        '15': 5000,
        'spare': 5000,
      },
    },
  },
  [ESportType.BASKETBALL.toString()]: {
    [GAME_TYPE.RUNING]: {
      // 让球
      'FT_AH,HT_AH,Q1_AH,Q2_AH,Q3_AH,Q4_AH': {
        '1': 300000,
        '2': 60000,
        '3': 50000,
        '4': 30000,
        '5': 15000,
        '6': 10000,
        '7': 8000,
        '8': 6000,
        '9': 5000,
        '10': 3000,
        '11': 3000,
        '12': 3000,
        '13': 3000,
        '14': 500,
        '15': 500,
        'spare': 500,
      },
      // 大小
      'FT_OU,HT_OU,Q1_OU,Q2_OU,Q3_OU,Q4_OU': {
        '1': 300000,
        '2': 60000,
        '3': 50000,
        '4': 30000,
        '5': 15000,
        '6': 10000,
        '7': 8000,
        '8': 6000,
        '9': 5000,
        '10': 3000,
        '11': 3000,
        '12': 3000,
        '13': 3000,
        '14': 500,
        '15': 500,
        'spare': 500,
      },
      // 独赢
      'FT_ML,HT_ML,Q1_ML,Q2_ML,Q3_ML,Q4_ML': {
        '1': 300000,
        '2': 60000,
        '3': 50000,
        '4': 30000,
        '5': 15000,
        '6': 10000,
        '7': 8000,
        '8': 6000,
        '9': 5000,
        '10': 3000,
        '11': 3000,
        '12': 3000,
        '13': 3000,
        '14': 500,
        '15': 500,
        'spare': 500,
      },
    },
    [GAME_TYPE.UNRUNING]: {
      // 让球
      'FT_AH,HT_AH,Q1_AH,Q2_AH,Q3_AH,Q4_AH': {
        '1': 180000,
        '2': 40000,
        '3': 30000,
        '4': 20000,
        '5': 15000,
        '6': 10000,
        '7': 6000,
        '8': 4000,
        '9': 3000,
        '10': 2500,
        '11': 2500,
        '12': 1500,
        '13': 1500,
        '14': 500,
        '15': 500,
        'spare': 500,
      },
      // 大小
      'FT_OU,HT_OU,Q1_OU,Q2_OU,Q3_OU,Q4_OU': {
        '1': 180000,
        '2': 40000,
        '3': 30000,
        '4': 20000,
        '5': 15000,
        '6': 10000,
        '7': 6000,
        '8': 4000,
        '9': 3000,
        '10': 2500,
        '11': 2500,
        '12': 1500,
        '13': 1500,
        '14': 500,
        '15': 500,
        'spare': 500,
      },
      // 独赢
      'FT_ML,HT_ML,Q1_ML,Q2_ML,Q3_ML,Q4_ML': {
        '1': 180000,
        '2': 40000,
        '3': 30000,
        '4': 20000,
        '5': 15000,
        '6': 10000,
        '7': 6000,
        '8': 4000,
        '9': 3000,
        '10': 2500,
        '11': 2500,
        '12': 1500,
        '13': 1500,
        '14': 500,
        '15': 500,
        'spare': 500,
      },
    },
  },
};
const sports = {
  [ESportType.FOOTBALL.toString()]: FOOTBALL,
  [ESportType.BASKETBALL.toString()]: BASKETBALL,
};
const transfLeagueToLevel = (lv: number, sprotId: ESportType): any =>{
  let result = undefined;
  const sport = sports[sprotId];
  if (!sport) return result;
  sport.find((item)=>{
    if ( lv>= item.range[0] && lv <=item.range[1]) {
      result = item.l;
      return;
    };
  });
  if (!result) result = 'spare';
  return result;
};
export const getMaxLimitAmount = (lv: number, sprotId: ESportType, isRunning: GAME_TYPE, playCode: string) => {
  const l = transfLeagueToLevel(lv, sprotId);
  if (!l) return anotherResult(sprotId, lv);
  const code = _.find(Object.keys(DATA[sprotId][isRunning]), (item)=>item.includes(playCode));
  if (!code) return anotherResult(sprotId, lv);
  if (!DATA[sprotId][isRunning][code]) return anotherResult(sprotId, lv);
  if (!DATA[sprotId][isRunning][code][l]) return anotherResult(sprotId, lv);
  return DATA[sprotId][isRunning][code][l];
};
const anotherResult = (sprotId:number, lv: number)=> {
  if (sprotId > 33) {
    return lv <= 5 ? 10000 : 3000;
  }
  return lv <= 60 ? 10000 : 3000;
};
