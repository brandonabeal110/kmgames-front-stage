/*
 * @Author: Passion.KMG
 * @Date: 2023-12-16 10:22:07
 * @LastEditors: Galen.GE
 * @FilePath: /KMG/src/views/kmg/mobile/pages/SportGame/components/SportTypeSelector/index.tsx
 * @Description:
 */
import {useMemo} from 'react';
import useSettings from '@core/hooks/sports/useSettings';
// import usePublicState from '@core/hooks/usePublicState';
import classnames from 'classnames';
import {useSelector} from 'react-redux';
// import TStore, {TMatchStatistic} from '@core/reducers/_reduxStore';
import TStore from '@core/reducers/_reduxStore';
import styles from './style.scss';
import {useLocation} from 'react-router';
import useFavorites from '@core/hooks/sports/useFavorites';
import useEventEmitter from '@core/hooks/useEventEmitter';
import {TMitt} from '@core/constants/enum/mitt';
import usePublicState from '@core/hooks/usePublicState';

export default function() {
  const sportList = useSelector((state: TStore) => state.sport.display.matchStatistics);
  // const {dispatch, ACTIONS} = usePublicState();
  const {switchSportByType, sportId} = useSettings();
  const location = useLocation();
  const {favoriteIds} = useFavorites();
  const isEsports = useMemo(() => {
    return location.pathname === '/esports';
  }, [location]);
  const {dispatch, ACTIONS} = usePublicState();
  const {emit} = useEventEmitter<TMitt['toggleFavorite']>({mittName: 'toggleFavorite'});
  const list = useMemo(() => {
    if (isEsports) {
      const ids = [278, 276, 279, 277];
      const obj = sportList.reduce((a: any, b) => {
        a[b.sportId] = b;
        return a;
      }, {});
      return ids.map((item) => obj[item]);
    }
    // const favorite: TMatchStatistic = {
    //   sportId: 0,
    //   count: favoriteIds.length,
    //   sportName: '收藏',
    // };
    return sportList.filter((item) => item.sportId !== 696969 && item.sportId !== 4);
    // return [favorite].concat(sportList.filter((item) => item.sportId !== 696969));
  }, [sportList, isEsports, favoriteIds]);

  const handleSwitchSport = React.useCallback((count: number, newSportId: number) => {
    if (sportId === newSportId) {
      return;
    }
    emit({display: newSportId === 0});
    // if (count === 0) {
    //   dispatch(ACTIONS.BASE.openToast({text: '暂无赛事', types: 'info'}));
    //   return;
    // }
    switchSportByType(newSportId);
  }, [sportId]);

  const onClick = (item: any) => {
    if (!isEsports && item.available === 0) {
      dispatch(ACTIONS.BASE.openToast({text: '暂未开启', types: 'error'}));
      return;
    }
    handleSwitchSport(item.count, item.sportId);
  };
  return (
    <div className={styles.wrapper}>
      {list.map((item) => (
        item &&
        <div
          className={classnames('sport-type-item', {disabled: !isEsports && !item.available})}
          onClick={() => onClick(item)}
          key={item.sportId}>
          <div className={classnames('sport-logo', `sid-${item?.sportId}`, {active: sportId === item?.sportId, disabled: !isEsports && !item.available})}>
            <span className='total'>{item.count}</span>
          </div>
          <p className={`${sportId === item.sportId ? 'active' : ''}`}>{item.sportId === 5 ? '斯诺克' : item.sportName}</p>
        </div>
      ))}
    </div>
  );
}
