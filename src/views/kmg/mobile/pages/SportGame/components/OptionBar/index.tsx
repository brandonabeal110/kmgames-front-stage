/*
 * @Author: Galen.GE
 * @Date: 2024-01-16 14:09:17
 * @LastEditors: Galen.GE
 * @FilePath: /KMG/src/views/kmg/mobile/pages/SportGame/components/OptionBar/index.tsx
 * @Description:
 */
import useSettings from '@core/hooks/sports/useSettings';
import SwitchButton from '@core/templates/mobile/components/SwitchButton';
import {ALL_SORTBY, EGameBettingType} from '@constants/enum/sport';
import css from './style.scss';
import {useLocation} from 'react-router';
import SearchInput from './SearchInput';
import {useState} from 'react';

export default () => {
  const {switchSortByType, switchGameBettingByType, sortBy, gameBettingType} = useSettings();
  const location = useLocation();
  const [isFocus, setFocus] = useState(false);
  const onFocusChange = (flag: boolean) => {
    setFocus(flag);
  };

  return (
    location.pathname !== '/esports' &&
    <div className={css.wrapper}>
      {
        !isFocus &&
        <>
          <SwitchButton
            className='switch-btn'
            options={[
              {
                label: '专业版',
                value: EGameBettingType.ADVANCED,
              },
              {
                label: '新手版',
                value: EGameBettingType.BEGINNER,
              },
            ]}
            checked={gameBettingType}
            width={55}
            onChange={(value: any) => switchGameBettingByType(value)}
          />
          <SwitchButton
            className='switch-btn'
            options={ALL_SORTBY.map((i) => ({label: i.name, value: i.code}))}
            checked={sortBy}
            width={55}
            onChange={(value: any) => switchSortByType(value)}
          />
        </>
      }
      <div className='league-search'>
        <SearchInput isFocus={isFocus} onFocusChange={onFocusChange} />
      </div>
    </div>
  );
};
