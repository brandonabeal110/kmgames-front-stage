/*
 * @Author: Galen.GE
 * @Date: 2024-01-16 17:17:59
 * @LastEditors: Galen.GE
 * @FilePath: /KMG/src/views/kmg/mobile/pages/SportGame/components/Navigation/index.tsx
 * @Description:
 */
import useSettingMenu from '@core/hooks/sports/useSettings';
import css from './style.scss';
import useHandicapTutorial from '@core/hooks/sports/useHandicapTutorial';
import useNavigationHooks from '@core/hooks/sports/useNavigation';
import {useHistory, useLocation} from 'react-router';
import useGuard from '@core/hooks/sports/useGuard';
import {EPollIntervalGuardKeys} from '@core/constants/enum/sport';
// import classnames from 'classnames';
import useEventEmitter from '@core/hooks/useEventEmitter';
import {TMitt} from '@core/constants/enum/mitt';
export default () => {
  const {handleSettingMenu} = useSettingMenu();
  const {handleHandicapTutorial} = useHandicapTutorial();
  const {toggleMobileOrderHistory} = useNavigationHooks();
  const location = useLocation();
  const history = useHistory();
  const {isReload, resetGuard, setIsReload} = useGuard();
  const {emit} = useEventEmitter<TMitt['toggleFavorite']>({mittName: 'toggleFavorite'});
  const reloadEmit = useEventEmitter<TMitt['isReload']>({mittName: 'isReload'});
  const [showFavorite, setShowFavorite] = React.useState(false);
  useEventEmitter<TMitt['toggleFavorite']>({mittName: 'toggleFavorite', on: ({display}) => setShowFavorite(display)});

  const handleReload = ()=>{
    if (isReload) return;
    if (showFavorite) {
      reloadEmit.emit({display: true});
      setIsReload(true);
      setTimeout(() => {
        setIsReload(false);
      }, 2000);
      return;
    }
    resetGuard(EPollIntervalGuardKeys.LEAGUE_STATISTICS);
  };

  const handleChange = () => {
    history.push(location.pathname === '/' ? '/esports' : '/');
    emit({display: false});
  };
  return (
    <div className={css.wrapper}>
      <div className="item" onClick={handleHandicapTutorial}>
        <img src={require('./i/icon-1.png')} />
        <span>盘口教程</span>
      </div>
      <div className="item" onClick={handleSettingMenu}>
        <img src={require('./i/icon-2.png')} />
        <span>设置菜单</span>
      </div>
      <div className="item" onClick={handleChange}>
        <img src={require(`./i/icon-${location.pathname === '/' ? 6 : 7}.webp`)} />
        <span>{location.pathname === '/' ? '电竞' : '体育'}</span>
      </div>
      <div className="item" onClick={() => toggleMobileOrderHistory(2, 0)}>
        <img src={require('./i/icon-3.png')} />
        <span>注单记录</span>
      </div>
      <div className='item' onClick={handleReload}>
        <div className='icon-wrap'>
          <img className={`${isReload && 'rotate-infinite'}`} src={require('./i/loading.svg')} />
        </div>
        <span>刷新</span>
      </div>
    </div>
  );
};
