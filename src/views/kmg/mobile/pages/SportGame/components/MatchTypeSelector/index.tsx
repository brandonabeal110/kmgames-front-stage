/*
 * @Author: Galen.GE
 * @Date: 2024-01-16 12:40:58
 * @LastEditors: Galen.GE
 * @FilePath: /KMG/src/views/kmg/mobile/pages/SportGame/components/TypeSelector/index.tsx
 * @Description:
 */

// import DpIcon from '@views/kmg/mobile/components/Icon';
import css from './style.scss';
import usePublicState from '@core/hooks/usePublicState';
import useSettings from '@core/hooks/sports/useSettings';
import {EMatchTypes} from '@core/constants/enum/sport';
import classnames from 'classnames';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import TStore from '@core/reducers/_reduxStore';
import dayjs from 'dayjs';
import {formatCurrency} from '@core/helpers/unit';
import useEventEmitter from '@core/hooks/useEventEmitter';
import {TMitt} from '@core/constants/enum/mitt';
import {useLocation} from 'react-router';
import useProfile from '@core/hooks/users/useProfile';

export default React.memo(() => {
  const {user, dispatch, ACTIONS} = usePublicState();
  const {switchMatchType} = useSettings();
  const [selectIndex, setSelectIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const {emit} = useEventEmitter<TMitt['toggleFavorite']>({mittName: 'toggleFavorite'});
  const {emit: showDateEmit} = useEventEmitter<TMitt['showDatePick']>({mittName: 'showDatePick'});
  const location = useLocation();
  const {loadingProfile, getProfile} = useProfile();
  const onChangeType = (index: number, type?: EMatchTypes) => {
    if (type !== undefined) {
      switchMatchType(type);
      setSelectIndex(index);
    }
    dispatch(ACTIONS.BASE.toggleSerierWay({data: index === 4}));
    setIsFavorite(index === 3);
    emit({display: index === 3});
  };

  useEffect(() => {
    onChangeType(0, EMatchTypes.IN_PLAY);
  }, [location.pathname]);
  useEffect(() => {
    showDateEmit({display: selectIndex === 2});
  }, [selectIndex]);

  return (
    <>
      <div className={css.wrapper}>
        <div className='div'>
          {/* <DpIcon type="arrow" /> */}
          <div className='navbar'>
            <div className={classnames('text-wrapper', {active: !isFavorite && selectIndex === 0})} onClick={() => onChangeType(0, EMatchTypes.IN_PLAY)}>今日</div>
            <div className={classnames('text-wrapper', {active: !isFavorite && selectIndex === 1})} onClick={() => onChangeType(1, EMatchTypes.IN_PLAY)}>滚球</div>
            <div className={classnames('text-wrapper', {active: !isFavorite && selectIndex === 2})} onClick={() => onChangeType(2, EMatchTypes.EARLY)}>早盘</div>
            {/* <div className='text-wrapper'>冠军</div> */}
            <div className={classnames('text-wrapper', {active: isFavorite})} onClick={() => onChangeType(3)}>收藏</div>
          </div>
        </div>
        <div className={classnames('div-2', {'rotate-infinite': loadingProfile})} onClick={() => getProfile()}>
          <div className='group'>
            <img className='union' alt='Union' src={require('./i/union.svg')} />
          </div>
          <div className='text-wrapper-3'>{formatCurrency(user.info.totalBalance)}</div>
        </div>
      </div>
    </>
  );
});

export const DatePicker = React.memo(() => {
  const earlyGroup = useSelector((state: TStore) => state.sport.display.earlyGroup);
  const {switchQueryDate} = useSettings();
  const sportId = useSelector((state: TStore) => state.sport.userSettings.sportId);
  const [index, setIndex] = useState(0);
  if (!earlyGroup) {
    return <></>;
  }
  const week = _.times(7).map((i) => ({
    name: dayjs()
        .add(i + 1, 'day')
        .format('MM/DD'),
    count: earlyGroup[i + 1],
  }));
  const dates = [{name: '全部', count: earlyGroup[0]}, ...week, {name: '其他', count: _.last(earlyGroup)}];
  const handleClick = (idx: number) => {
    switchQueryDate(idx);
    setIndex(idx);
  };
  useEffect(() => {
    handleClick(0);
  }, [sportId]);
  return (
    <div className="date-list">
      {
        dates.map((item, idx) => (
          <div className={classnames('option-item', {active: idx === index})} onClick={() => handleClick(idx)} key={item.name}>{item.name}</div>
        ))
      }
    </div>
  );
});
