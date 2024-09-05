import {PlayType, TMatch} from '@core/services/Table';
import {getNewbiePlayListBySid, transforMarkets} from '@core/utils';
import {OddItem} from '../../MatchMethods/Odds/OddsItem';
import {useSelector} from 'react-redux';
import TStore from '@core/reducers/_reduxStore';
import {useMemo} from 'react';
import classnames from 'classnames';
import OddsStyle from '../../MatchMethods/Odds/style.scss';
import DpImage from '@views/kmg/mobile/components/Image';
interface IMatchTitlesProps {
  match: TMatch;
}

const Odds = ({match}: IMatchTitlesProps) => {
  const gameList = getNewbiePlayListBySid(match.sportId, match.round);
  const markets: (undefined | PlayType)[] = transforMarkets(match, gameList);
  const currentOddType = useSelector((state: TStore) => state.user.currentOddType);
  const mks = useMemo(() => {
    const arr = markets[0]?.mks[0]?.ops ?? [];
    if (markets[0]?.code?.endsWith('_1X2') && arr.length === 3) {
      return [arr[0], arr[2], arr[1]];
    };
    return arr;
  }, [match]);
  return (
    <>
      {
        mks.map((op, idx) => <OddItem len={mks.length} match={match} isNoob={true} isHome={idx} key={op.id} op={op} oddType={currentOddType} methodCode={markets[0].code} />)
      }
      {
        !markets[0]?.mks[0]?.ops &&
        new Array(match.sportId === 1 ? 3 : 2).fill(0).map((_, idx) => <EmptyItem match={match} len={match.sportId === 1 ? 3 : 2} isNoob={true} isHome={idx} key={idx} />)
      }
    </>
  );
};

interface IEmptyItem {
  isInList?: boolean;
  isNoob?: boolean;
  // 0 主队 1和 2客
  isHome?: number;
  match?: TMatch;
  len?: number;
}

const EmptyItem = ({match, len, isHome, isNoob}: IEmptyItem) => {
  return (
    isNoob ? <div className={classnames(OddsStyle.item, 'odd-item', {'is-home': isHome === 0, 'is-draw': len === 3 && isHome === 1})}>
      <div className={classnames('name')}>
        <span className="name-text">
          {(isHome === 0 ? match.teams.home.name : (isHome === 1 && len === 3) ? '和' : match.teams.away.name) }
        </span>
        {
          isNoob && (len === 2 || isHome !== 1) &&
          <DpImage size={16} width={16} type='team' src={isHome === 0 ? match.teams.home.icon : match.teams.away.icon} />
        }
      </div>
      <span>-</span>
    </div> : <div className={OddsStyle.item}>
      <span>-</span>
    </div>
  );
};

export default Odds;
