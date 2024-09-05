/*
 * @Author: Passion.KMG
 * @Date: 2023-12-16 10:22:07
 * @LastEditors: Galen.GE
 * @FilePath: /KMG/src/views/kmg/desktop/pages/SportGame/components/LeagueList/index.tsx
 * @Description:
 */
import {useMemo, useRef} from 'react';
import {useInView} from 'react-intersection-observer';
import classnames from 'classnames';
import {useSelector} from 'react-redux';
import {useLeagueListData, useMatchListData} from '@core/hooks/sports/useRenderData';
import useSettings from '@core/hooks/sports/useSettings';
import useEventEmitter from '@core/hooks/useEventEmitter';
import useFavorites from '@core/hooks/sports/useFavorites';
import DpIcon from '@this/components/Icon';
import DpImage from '@this/components/Image';
import DpSkeleton from '@this/components/Skeleton';
import {TMatch} from '@core/services/Table';
import Empty from '@this/components/Empty';
import {getPlayListBySid, getPlayNameByKc} from '@core/utils';
import {ALL_MATCH_TYPES, EMatchTypes, EGameBettingType, EESportType} from '@constants/enum/sport';
import MatchItem from '../MatchItem';
import MatchItemOfNoob from '../MatchItemOfNoob';
import TStore, {TLeagueStatistic} from '@core/reducers/_reduxStore.d';
import {TMitt} from '@constants/enum/mitt';
import styles from './style.scss';
import {useUnmount} from 'react-use';
import {useLocation} from 'react-router';
import {useActivate, useUnactivate} from 'react-activation';
import usePublicState from '@core/hooks/usePublicState';
import storage from '@core/helpers/storage';

export default React.memo(() => {
  const {leagues} = useLeagueListData();
  const {matchList} = useMatchListData();
  const {dispatch, ACTIONS} = usePublicState();
  const {sportId} = useSelector((state: TStore) => state.sport.userSettings);
  const currentLeagueId = useSelector((state: TStore) => state.sport.display.currentLeagueId);
  const {displayType} = useSelector((state: TStore) => state.sport.display);
  const matchType = useSelector((state: TStore) => state.sport.userSettings.matchType);
  const cacheLeagueList: TLeagueStatistic[] = useMemo(() => storage.getAny(`${sportId}_league_list`), [sportId]);
  const {toggleCollapseLeagueByMatchType, isCollapseInplay, isCollapseUpcoming} = useSettings();
  const cacheMatchList: TMatch[] = useMemo(() => storage.getAny(`${sportId}_match_list`), [sportId]);
  const wrapRef = useRef<HTMLDivElement>(null);
  useActivate(()=>{
    dispatch(ACTIONS.BASE.updateIsInsideMatchList(true));
  });
  useUnactivate(()=>{
    dispatch(ACTIONS.BASE.updateIsInsideMatchList(false));
  });
  const onToggle = (type: EMatchTypes) => {
    toggleCollapseLeagueByMatchType(type);
    const el = document.querySelector(`.${type}-first`) as HTMLDivElement;
    if (el) {
      if (type !== matchType && document.querySelector(`.${type === EMatchTypes.IN_PLAY ? EMatchTypes.UPCOMING : EMatchTypes.IN_PLAY}-end`)?.getBoundingClientRect().top > 154) return;
      if (wrapRef.current) wrapRef.current.scrollTop = el.offsetTop - 40;
    }
  };
  if (displayType == 'skeleton' && (matchType === EMatchTypes.EARLY || (!cacheLeagueList?.length || !cacheMatchList?.length))) {
    return <div className={styles.skeleton}>
      <DpSkeleton type="match" length={3} />
    </div>;
  }

  if (displayType === 'empty') {
    return (
      <div className="empty-wrapper center">
        <Empty />
      </div>
    );
  }

  const displyLeagues = _.filter(leagues, (item): boolean => {
    if (_.isEmpty(currentLeagueId)) {
      return true;
    }
    if (_.find(currentLeagueId, {id: item.leagueId, key: item.state})) {
      return true;
    }
    return false;
  });

  return (
    <div className={classnames(styles.wrapper, 'match-list-wrap')} ref={wrapRef}>
      {
        _.map(_.groupBy(_.orderBy(displayType == 'skeleton' ? cacheLeagueList : displyLeagues, ['state'], [matchType === EMatchTypes.IN_PLAY ? 'asc': 'desc']), 'state'), (leaguesGroup: Array<TLeagueStatistic>, key: EMatchTypes) =>
          <div key={key} >
            <div className={classnames('play-type-wrapper', 'pointer', {'is-closed': key === EMatchTypes.IN_PLAY ? !isCollapseInplay : !isCollapseUpcoming})} onClick={() => onToggle(key)}>
              <span>{ matchType === EMatchTypes.EARLY ? '早盘' : _.find(ALL_MATCH_TYPES, {code: key})?.name }</span>&nbsp;
              <span>({_.sumBy(leaguesGroup, (league) => league.countGroup[key])})</span>
            </div>
            {
              leaguesGroup.map((league, index) =>
                <LeagueItem
                  key={`${displayType}_${key}-${league.leagueId}`}
                  matches={_.groupBy(matchList, 'leagueId')[league.leagueId]}
                  cacheMatches={_.groupBy(cacheMatchList, 'leagueId')[league.leagueId]}
                  leagueId={league.leagueId}
                  leagueIcon={league.leagueIcon}
                  leagueName={league.leagueName}
                  state={key}
                  countGroup={league.countGroup}
                  matchIds={league.matchIds}
                  sportId={sportId}
                  isCache={displayType === 'skeleton'}
                  className={index === 0 ? `${key}-first` : index === leaguesGroup.length - 1 ? `${key}-end` : undefined}
                  watchInView
                />,
              )
            }
          </div>,
        )
      }
      {
        displayType === 'list' &&
        <div className="no-more">没有更多数据了</div>
      }
    </div>
  );
});

interface ILeagueItem {
  matches: Array<TMatch>;
  leagueId: number;
  leagueName: string;
  leagueIcon: string;
  state?: EMatchTypes;
  countGroup?: {[key in EMatchTypes]?: number};
  watchInView?: boolean;
  sportId: number;
  isCache?: boolean;
  cacheMatches?: Array<TMatch>;
  className?: string;
  matchIds?: {
    [key in EMatchTypes]?: number[];
  },
}

export const LeagueItem = React.memo(({leagueId, leagueIcon, leagueName, matches, state, countGroup, matchIds, sportId, watchInView, isCache, cacheMatches, className}: ILeagueItem) => {
  const {ref, inView} = useInView({threshold: 0});
  const {emit} = useEventEmitter<TMitt['syncMatchPollingLeagueIds']>({mittName: 'syncMatchPollingLeagueIds'});

  const {toggleCollapseLeague, collapseLeagueIds, gameBettingType} = useSettings();
  const {isFavorite, onToggleFavorite} = useFavorites();
  const location = useLocation();

  const gameList = useMemo(() => {
    return getPlayListBySid(sportId);
  }, [sportId, location]);


  const gameNames = useMemo(() => {
    return gameList.map((item) => getPlayNameByKc({code: item, sportId}));
  }, [gameList]);

  useUnmount(() => {
    emit({leagueIds: [leagueId], display: false, state});
  });

  React.useEffect(() => {
    if (watchInView && !isCache) {
      emit({leagueIds: [leagueId], display: inView, state});
    }
  }, [inView, isCache]);

  const list = matches?.length ? matches : cacheMatches;

  let matchWithState = list;

  if (state) {
    matchWithState = list?.filter((item) => {
      return item.isLive === (state === EMatchTypes.IN_PLAY) && matchIds[state]?.includes(item.matchId);
    });
  }

  // 状态前缀
  const statePrefix = state || 'fav';

  const lg = useMemo(() => {
    if (sportId === EESportType.LOL) {
      return require('@my/assets/images/common/icon_lol1.png');
    } else if (sportId === EESportType.DOTA2) {
      return require('@my/assets/images/common/icon_dota1.png');
    } else if (sportId === EESportType.KINGOFGLORY) {
      return require('@my/assets/images/common/icon_king1.png');
    } else if (sportId === EESportType.CS2) {
      return require('@my/assets/images/common/icon_csgo1.png');
    } else {
      return leagueIcon;
    }
  }, [sportId]);

  const matchIdsInLeague = matchIds ? matchIds[state] : _.map(list, (i) => i.matchId);
  return (
    <div className={classnames(styles.leagueItem, className)}>
      <div className={classnames('league-wrapper', {'border-bottom': _.includes(collapseLeagueIds, `${statePrefix}#${leagueId}`)})} onClick={() => toggleCollapseLeague({leagueId: `${statePrefix}#${leagueId}`, isRequestData: !list})}>
        <div className="league-info">
          <DpImage className="mr-8" src={lg} type="league" />
          <p className="league-name">
            {leagueName}
            {
              countGroup &&
              !_.includes(collapseLeagueIds, `${state}#${leagueId}`) && <span className="ml-10">{countGroup[state]}</span>
            }
          </p>
        </div>
        {
          _.includes(collapseLeagueIds, `${statePrefix}#${leagueId}`) &&
          (sportId <= 33 && gameBettingType === EGameBettingType.ADVANCED) &&
          <div className="match-title">
            <div className="events-tools">
              {
                gameNames.map((item) => (
                  <div className="game-name" key={item}>{item}</div>
                ))
              }
            </div>
          </div>
        }
        <div className="action">
          <DpIcon type="collect" active={isFavorite(matchIdsInLeague)} onClick={(e) => onToggleFavorite(e, matchIdsInLeague)} />
        </div>
      </div>
      {
        _.includes(collapseLeagueIds, `${statePrefix}#${leagueId}`) &&
        <div className="match-items-wrapper" ref={ref}>
          {
            !list &&
            <div style={{padding: '14px', paddingBottom: '1px'}}>
              <DpSkeleton type="match" length={1} />
            </div>
          }
          {
            matchWithState?.length > 0 &&
            <>
              {
                matchWithState.map((item: TMatch) => (item.sportId <= 33 && gameBettingType === EGameBettingType.ADVANCED) ?
                <MatchItem match={item} key={item.matchId} matchWithState={matchWithState} gameBettingType={gameBettingType} gameNames={gameNames} /> :
                <MatchItemOfNoob match={item} key={item.matchId} />,
                )
              }
            </>
          }
        </div>
      }
    </div>
  );
});
