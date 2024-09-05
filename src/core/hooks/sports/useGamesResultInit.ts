/*
 * @Author: Weima.KMG
 * @Date: 2024-1-28
 * @LastEditors: Weima.KMG
 * @FilePath: /KMG/src/core/hooks/sports/useGamesResultInit.ts
 * @Description
 */
import {useMount, useUnmount} from 'react-use';
import usePublicState from '../usePublicState';
import {useSelector} from 'react-redux';
import TStore, {TGameResultPageInfo} from '@core/reducers/_reduxStore';
import dayjs from 'dayjs';
import {dateFormat} from '@views/kmg/desktop/components/DateRangePicker';
import {useEffect, useState} from 'react';
// import {ESportsCategory, sportsCategory} from '@core/constants/enum/sport/sportsCategory';
import {ESportsCategory} from '@core/constants/enum/sport/sportsCategory';
// todo 隐藏还未上线球种赛果
import {ALL_ESPORTS, ESportType} from '@core/constants/enum/sport';

export const initGameResultPageInfo: TGameResultPageInfo = {
  sportId: 1,
  pageNum: 1,
  pageSize: 10,
  beginTime: dayjs().subtract(7, 'day').format(dateFormat),
  endTime: dayjs().format(dateFormat),
};

export default () => {
  const {dispatch, ACTIONS} = usePublicState();
  const {matchStatistics} = useSelector((state: TStore) => state.sport.display);
  const {gameResultPageInfo} = useSelector((state: TStore) => state.sport.userSettings);
  const {loading} = useSelector((state: TStore) => state.base);

  const [pageInfo, setPageInfo] = useState<TGameResultPageInfo>(initGameResultPageInfo);
  const [gameResultOpts, setGameResultOpts] = useState<Array<{label: string, value: number}>>(_.map(matchStatistics.filter((item) => item.sportId === ESportType.FOOTBALL), (match) => ({label: match.sportName, value: match.sportId})));
  // const [gameResultOpts, setGameResultOpts] = useState<Array<{label: string, value: number}>>(_.map(matchStatistics.filter((item) => !!item.count), (match) => ({label: match.sportName, value: match.sportId})));

  // 管理页面页号
  useEffect(() => {
    setPageInfo(gameResultPageInfo);
    dispatch(ACTIONS.SPORT.getGameResultList({params: gameResultPageInfo}));
  }, [gameResultPageInfo]);

  // 管理页面体育列表
  useEffect(() => {
    // 支持所有体育类型
    // const sportsCategoryArr = _.map(sportsCategory, (sport) => sport.sportId);
    // const sportsMatchStatistics = _.filter(matchStatistics, (match) => !!match.count && _.indexOf(sportsCategoryArr, match.sportId) >= 0);
    // sportsMatchStatistics.length && setGameResultOpts(sportsMatchStatistics.filter((item) => !!item.count).map((opt) => ({label: opt.sportName, value: opt.sportId})));

    // 目前支持的体育
    setGameResultOpts([
      {label: '足球', value: ESportsCategory.FOOTBALL},
      {label: '篮球', value: ESportsCategory.BASKETBALL},
      {label: '网球', value: ESportsCategory.TENNIS},
      // todu 隐藏还未上线球种
      // {label: '排球', value: ESportsCategory.VOLLEYBALL},
      ..._.map(ALL_ESPORTS, (esport) => ({
        label: esport.name,
        value: esport.code,
      })),
    ]);
  }, [matchStatistics]);

  useMount(() => {
    dispatch(ACTIONS.SPORT.getMatchStatistics({params: {querys: undefined}}));
  });

  useUnmount(() => {
    dispatch(ACTIONS.SPORT.resetGameResultPageInfo());
  });

  return {
    loading,
    pageInfo,
    setPageInfo,
    gameResultOpts,
  };
};
