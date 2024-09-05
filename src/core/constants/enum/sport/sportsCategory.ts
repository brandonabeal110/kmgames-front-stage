import * as tags from '@views/kmg/desktop/pages/GamesResult/components/ResultTable/components/Icons';
import {EGameResult} from './gamesResult';

export enum ESportsCategory {
  FOOTBALL = 1,
  BASKETBALL = 2,
  TENNIS = 3,
  E_SPORTS = 4,
  SNOOKER = 5,
  VOLLEYBALL = 6,
  SPECIAL_PROJECTS = 7,
  DARTS = 8,
  RUGBY = 9,
  BOXING_MMA = 10,
  HANDBALL = 11,
  ICE_HOCKEY = 12,
  CRICKET = 13,
  FINANCIAL_BETTING = 14,
  LOTTERY = 15,
  AMERICAN_FOOTBALL = 16,
  GOLF = 17,
  BASEBALL = 18,
  BADMINTON = 19,
  BEAUTY_CONTEST = 20,
  RACING = 21,
  BEACH_SOCCER = 22,
  TABLE_TENNIS = 23,
  SOFTBALL = 24,
  INDOOR_SOCCER = 25,
  BEACH_VOLLEYBALL = 26,
  WINTER_SPORTS = 27,
  FIELD_HOCKEY = 28,
  CYCLING = 29,
  GYMNASTICS = 30,
  TRACK_AND_FIELD = 31,
  MORE_SPORTS = 32,
  WATER_SPORTS = 33,
  DOTA = 276,
  CSGO = 277,
  LOL = 278,
  KING = 279,
}

export const sportsCategory = [
  {
    sportId: 1,
    name: '足球',
    resultIcons: tags.football,
  },
  {
    sportId: 2,
    name: '篮球',
    resultIcons: tags.basketball,
  },
  {
    sportId: 3,
    name: '网球',
    resultIcons: tags.tennis,
  },
  {
    sportId: 4,
    name: '电子竞技',
    resultIcons: tags.football,
  },
  {
    sportId: 5,
    name: '斯诺克',
    resultIcons: tags.snooker,
  },
  {
    sportId: 6,
    name: '排球',
    resultIcons: tags.volleyball,
  },
  {
    sportId: 7,
    name: '特别项目',
    resultIcons: tags.football,
  },
  {
    sportId: 8,
    name: '飞镖',
    resultIcons: tags.football,
  },
  {
    sportId: 9,
    name: '橄榄球',
    resultIcons: tags.rugby,
  },
  {
    sportId: 10,
    name: '拳击/格斗',
    resultIcons: tags.boxing,
  },
  {
    sportId: 11,
    name: '手球',
    resultIcons: tags.handball,
  },
  {
    sportId: 12,
    name: '冰球',
    resultIcons: tags.football,
  },
  {
    sportId: 13,
    name: '板球',
    resultIcons: tags.football,
  },
  {
    sportId: 14,
    name: '金融投注',
    resultIcons: tags.football,
  },
  {
    sportId: 15,
    name: '彩票',
    resultIcons: tags.football,
  },
  {
    sportId: 16,
    name: '美式足球',
    resultIcons: tags.americasoccer,
  },
  {
    sportId: 17,
    name: '高尔夫球',
    resultIcons: tags.football,
  },
  {
    sportId: 18,
    name: '棒球',
    resultIcons: tags.baseball,
  },
  {
    sportId: 19,
    name: '羽毛球',
    resultIcons: tags.badminton,
  },
  {
    sportId: 20,
    name: '选美大赛',
    resultIcons: tags.football,
  },
  {
    sportId: 21,
    name: '赛车',
    resultIcons: tags.football,
  },
  {
    sportId: 22,
    name: '沙滩足球',
    resultIcons: tags.football,
  },
  {
    sportId: 23,
    name: '乒乓球',
    resultIcons: tags.pingpong,
  },
  {
    sportId: 24,
    name: '垒球',
    resultIcons: tags.football,
  },
  {
    sportId: 25,
    name: '室内足球',
    resultIcons: tags.football,
  },
  {
    sportId: 26,
    name: '沙滩排球',
    resultIcons: tags.beachVolleyball,
  },
  {
    sportId: 27,
    name: '冬季运动',
    resultIcons: tags.football,
  },
  {
    sportId: 28,
    name: '曲棍球',
    resultIcons: tags.hockey,
  },
  {
    sportId: 29,
    name: '自行车',
    resultIcons: tags.football,
  },
  {
    sportId: 30,
    name: '体操',
    resultIcons: tags.football,
  },
  {
    sportId: 31,
    name: '田径',
    resultIcons: tags.football,
  },
  {
    sportId: 32,
    name: '更多运动',
    resultIcons: tags.football,
  },
  {
    sportId: 33,
    name: '水上运动',
    resultIcons: tags.football,
  },
];

export const eSportsCategory = [
  {
    sportId: 276,
    name: 'DOTA2',
    resultIcons: tags.egame,
  },
  {
    sportId: 277,
    name: 'CS:GO/CS2',
    resultIcons: tags.egame,
  },
  {
    sportId: 278,
    name: '英雄联盟',
    resultIcons: tags.egame,
  },
  {
    sportId: 279,
    name: '王者荣耀',
    resultIcons: tags.egame,
  },
];

export interface IconProps {
  title: string;
  element: React.ReactElement;
}
export default [...sportsCategory, ...eSportsCategory] as {
  sportId: number;
  name: string;
  resultIcons?: Record<EGameResult, IconProps>;
}[];
