import style from './style.scss';
import {ALL_SORTBY, EGameBettingType, EHandicapType, HANDICAP_TYPE_MAP} from '@core/constants/enum/sport';
import {ETHEME} from '@views/kmg/desktop/configs';
import SettingItem from './SettingItem';
import useSettings from '@core/hooks/sports/useSettings';
import useTheme from '@core/hooks/useTheme';
import {useMemo} from 'react';
import usePublicState from '@core/hooks/usePublicState';
import {useLocation} from 'react-router';
import {useSelector} from 'react-redux';
import { IResBase } from '@core/actions/_actionTypes';

export interface SettingItemType {
    setting: string;
    text: string;
    options?: {label: string, value: any}[];
    set?: (value: any) => void;
    value?: any;
    url?: string;
}

export enum FontSizeSetting {
    DEFUALT = 'DEFAULT',
    LARGE = 'LARGE',
}

interface Props {
  onClose: () => void;
}

export default ({onClose}: Props) => {
  const location = useLocation();
  const {switchSortByType, switchGameBettingByType, handleHandicap, sortBy, gameBettingType} = useSettings();
  const {switchTheme, theme} = useTheme();
  const {user} = usePublicState();
  const {dispatch, ACTIONS} = usePublicState();
  const {   } = useSelector((state: IResBase) => state.sport.settingMenu);

  const settingList: (SettingItemType | null)[] = useMemo(()=>[
    location.pathname !== '/esports' ? {
      setting: 'betting-mode',
      text: '投注模式',
      options: [
        {
          label: '新手版',
          value: EGameBettingType.BEGINNER,
        },
        {
          label: '专业版',
          value: EGameBettingType.ADVANCED,
        },
      ],
      value: gameBettingType,
      set: switchGameBettingByType,
    } : null,
    {
      setting: 'sorting-rule',
      text: '排序规则',
      options: ALL_SORTBY.map((i) => ({label: i.name, value: i.code})),
      value: sortBy,
      set: switchSortByType,
    },
    {
      setting: 'handicap-setting',
      text: '盘口设置',
      options: [
        {
          label: HANDICAP_TYPE_MAP[EHandicapType.OU],
          value: EHandicapType.OU,
        },
        {
          label: HANDICAP_TYPE_MAP[EHandicapType.HK],
          value: EHandicapType.HK,
        },
      ],
      set: handleHandicap,
      value: user.currentOddType,
    },
    // {
    //   setting: 'font-size',
    //   text: '字号大小',
    //   options: [
    //     {
    //       label: '默认',
    //       value: FontSizeSetting.DEFUALT,
    //     },
    //     {
    //       label: '放大',
    //       value: FontSizeSetting.LARGE,
    //     },
    //   ],
    //   set: setFontStyle,
    //   value: fontStyle,
    // },
    {
      setting: 'theme-style',
      text: '主题风格',
      options: [
        {
          label: '日间',
          value: ETHEME.LIGHT,
        },
        {
          label: '夜间',
          value: ETHEME.DARK,
        },
      ],
      value: theme,
      set: switchTheme,
    },
    // {
    //   setting: 'daily-activity',
    //   text: '每日活动',
    //   options: [
    //     {
    //       label: '开启',
    //       value: DailyActivitySetting.TURN,
    //     },
    //     {
    //       label: '关闭',
    //       value: DailyActivitySetting.CLOSE,
    //     },
    //   ],
    // },
    // {
    //   setting: 'web-betting',
    //   text: '前往网页版',
    //   url: '/',
    // },
  ], [sortBy, theme, gameBettingType, user, location]);

  const onFilter = () => {
    dispatch(ACTIONS.SPORT.handleSettingMenu());
  }

  return (
    <div className={style.wrapper} onClick={(e) => e.stopPropagation()}>
      <div>
        <div className='menu-header'>
          <div className='header-text'>
            <span>联赛筛选</span>
            <span>（全部）</span>
          </div>
          <div>
            <div className='mark-group'>
              <img src={require('../i/icon_league_dejia_hot.png')} alt="" />
              <img src={require('../i/icon_league_fajia_hot.png')} alt="" />
              <img src={require('../i/icon_league_guowang_hot.png')} alt="" />
              <img src={require('../i/icon_league_ouguan_hot.png')} alt="" />
              <img src={require('../i/icon_league_oujin_hot.png')} alt="" />
            </div>
            <div className='memu-more' onClick={onFilter}>
              <span>更多</span>
              <img src={require('../i/arrow-right.png')} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='menu-content'>
          {settingList.map((setting, index)=>(
            setting ? <SettingItem setting={setting} key={index} /> : null
          ))}
        </div>
      </div>
      <div>
        <div className='menu-footer' onClick={onClose}>
          <span>关闭</span>
        </div>
      </div>
    </div>
  );
};
