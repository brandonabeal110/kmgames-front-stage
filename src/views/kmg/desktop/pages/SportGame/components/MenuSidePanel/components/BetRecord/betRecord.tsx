import {TBettingOrder} from '@core/apis/models/dashboard/get-betting-record.d';
import {BET_RESULT_TYPE_MAP, EBetResultType, EESportType, EGameType, EOrderTypeStatus} from '@constants/enum/sport/index';
import {formatCurrency} from '@helpers/unit';
import style from './style.scss';
import {EOrderStatus} from '@core/constants/enum/sport/orderTypes';
import {chooseEuropeOrAsiaText, displayHomeAwayScore, getBetHandiCapAtBetting, getBetTeamType, getPlayNameByKc, isPlayingMatch, isVisiableSecondText} from '@core/utils';
import {useInView} from 'react-intersection-observer';
import {Tooltip} from 'antd';
import useBetRecordHooks from '@core/hooks/dashboard/useBetRecordHooks';
import {assignDateSearch} from '@core/helpers/dateHelper';
import useSettings from '@core/hooks/sports/useSettings';
import {getSeriesDigitsStr} from '@core/utils/math';
import Empty from '@views/kmg/desktop/components/Empty';
interface IProps {
  betType: number;
}
export default React.memo(({betType}: IProps) => {
  const {list, getList, params, hasMore, loading} = useBetRecordHooks({pageNum: 1, pageSize: 10});
  const {ref, inView} = useInView();
  React.useEffect(()=>{
    const [start, end] = assignDateSearch('today24');
    const searchParams = {billStatus: 0, pageNum: 1, createTimeStart: start, createTimeEnd: end};
    const stateParams = {isAdd: false, isInit: true};
    if (betType === EOrderTypeStatus.UNSETTLED) {
      getList({...searchParams, isReserve: 2}, stateParams);
    } else {
      getList({...searchParams, billStatus: 1, isReserve: 2, status: undefined}, stateParams);
    };
  }, [betType]);
  React.useEffect(()=>{
    if (inView && !loading) {
      getList({pageNum: params.pageNum + 1}, {isAdd: true, isInit: false});
    }
  }, [inView]);
  return (
    <div className={style.wrapper}>
      <div className='order-list'>
        {list.map((item, idx: number) => <OrderItem data={item} key={idx} betType={betType}/>)}
        {!loading && hasMore && list.length>0 && <div className='more-data' ref={ref}>正在加载中...</div>}
        {!loading && list.length ===0 && (
          <div className='dp-empty-wrap center'>
            <Empty description='暂无数据' type="empty" />
          </div>
        )}
      </div>
    </div>
  );
});

interface IOrderItem {
  data: TBettingOrder;
  betType:EOrderTypeStatus;
}
function OrderItem({data}: IOrderItem) {
  const {switchSportByType, switchGameType, sportId} = useSettings();
  const handleSwitchSport = React.useCallback((newSportId: number) => {
    if (sportId === newSportId || (sportId > 33 && newSportId === EESportType.ALL)) {
      return;
    }
    if (sportId <= 33 && newSportId === EESportType.ALL) {
      switchGameType(EGameType.ESPORTS, EESportType.LOL);
    } else if (sportId > 33 && newSportId !== EESportType.ALL) {
      switchGameType(EGameType.SPORTS, newSportId);
    } else {
      switchSportByType(newSportId);
    }
  }, [sportId]);
  return (
    <div className='order-item'>
      <div className='game-type'>
        <span className='line'></span>
        <span className='type-name'>{data.seriesType === 1 ? '单关' : `串关${getSeriesDigitsStr(data.seriesType, data.details.length)}`}</span>
      </div>
      <div className='game-main'>
        {data.details.map((detail, index) => (
          <div key={detail.orderId+index}>
            <div className='league-name'>{detail.leagueNameCn}</div>
            <div className='match-names'>
              <Tooltip
                title={`${detail.homeTeamNameCn} v ${detail.awayTeamNameCn}`}
                placement='top'>
                {detail.homeTeamNameCn} v {detail.awayTeamNameCn}
                {(data.status !== EOrderStatus.AUTO_CANCLLED && data.status !== EOrderStatus.MANUAL_CANCLLED && EOrderTypeStatus.UNSETTLED === data.billStatus && detail?.isInplay === 1) && displayHomeAwayScore(detail.scoreBenchmark, detail.sportId)}
                {(data.status !== EOrderStatus.AUTO_CANCLLED && data.status !== EOrderStatus.MANUAL_CANCLLED && EOrderTypeStatus.SETTLED === data.billStatus) && displayHomeAwayScore(detail.settleScore, detail.sportId)}
              </Tooltip>
            </div>
            <div className='bet-detail'>
              <div className='l-1'>
                <span>
                  <Tooltip title={`[${detail.sportNameCn}]`}>
                    <em onClick={()=>handleSwitchSport(detail.sportId)}>[{detail.sportNameCn}]</em>
                  </Tooltip>
                  {isPlayingMatch(detail.isInplay)}&nbsp;&nbsp;{getPlayNameByKc({code: detail.kindsCode, name: detail.betItemName, ctid: detail.betItemCTID, sportId: detail.sportId})}&nbsp;&nbsp;
                  <em className='bet-game-type-text'>{chooseEuropeOrAsiaText(detail.marketType, detail.sportId)}</em>
                </span>
              </div>
              <div className='l-2'>
                <Tooltip title={`${getBetTeamType(detail)}`}>
                  <em className='play-type-name'>{getBetTeamType(detail)}</em>
                  {isVisiableSecondText(detail.betHandicap, detail.betN, detail.kindsCode) &&
                    <em>{getBetHandiCapAtBetting(detail.betHandicap, detail.sportId)}</em>}
                </Tooltip>
              </div>
              <div className='l-3'>
                <div className='odd'>
                  <span>@</span>
                  <span>{formatCurrency(detail.oddValue)}</span>
                </div>
                <div className='bet-result'>
                  {
                    (data.status !== EOrderStatus.AUTO_CANCLLED && data.status !== EOrderStatus.MANUAL_CANCLLED && data.billStatus == EOrderTypeStatus.SETTLED) &&
                    <span className={[EBetResultType.WIN, EBetResultType.WIN_HALF].includes(detail.betResult) ? 'win':'lose'}>
                      {BET_RESULT_TYPE_MAP[detail.betResult]}
                    </span>
                  }
                </div>
              </div>
            </div>
            {index !== data.details.length -1 && <div className='divider' />}
          </div>
        ))}
        <div className='bet-win'>
          <div>
            <span>投注金额</span>
            <span>{formatCurrency(data.productAmountTotal)}</span>
          </div>
          {
            data.billStatus == EOrderTypeStatus.UNSETTLED &&
            <div className='win-max-display'>
              <span>最高可赢</span>
              <span>{formatCurrency(data.maxWinAmount)}</span>
            </div>
          }
          {
            data.billStatus == EOrderTypeStatus.SETTLED &&
            <div className='win-max-display'>
              <span>返还金额</span>
              <span>{formatCurrency(data.profitAmount + data.productAmountTotal)}</span>
            </div>
          }
        </div>
      </div>
      <div className="order-bottom-line"></div>
    </div>
  );
}
