import {Button, Tooltip} from 'antd';
import {useSelector} from 'react-redux';
import DpIcon from '@this/components/Icon';
import {formatCurrency} from '@helpers/unit';
import TStore from '@core/reducers/_reduxStore';
import {chooseEuropeOrAsiaText, displayHomeAwayScore, getBetHandiCapAtBetting, getBetTeamType, getPlayNameByKc, isPlayingMatch, isVisiableSecondText} from '@core/utils';
import React from 'react';
import useOrderCart from '@core/hooks/sports/useOrderCart';
import styles from './style.scss';
import {getSeriesDigitsStr} from '@core/utils/math';
const ConfrimedOrders = React.memo(() => {
  const orders = useSelector((state: TStore) => state.sport.bet.confirmOrders);
  const {isExistConfirmed, removeConfirmedOrders, backOrdersDispaly} = useOrderCart();
  const singleBetOrder = ()=>{
    return orders.map((item) => (
      <div className="bet-item" key={item.id}>
        <div className='confirm-icon'>
          <DpIcon className='close' type='confirmed'/>
        </div>
        <div className="match-league">
          {item.details[0].leagueNameCn}
        </div>
        <div className="match-name">
          <Tooltip
            title={
              <span>{item.details[0].homeTeamNameCn} V {item.details[0].awayTeamNameCn}
                {item.details[0].isInplay === 1 && displayHomeAwayScore(item.details[0].scoreBenchmark, item.details[0].sportId)}
              </span>
            }
          >
            <span>{item.details[0].homeTeamNameCn} V {item.details[0].awayTeamNameCn}
              {item.details[0].isInplay === 1 && displayHomeAwayScore(item.details[0].scoreBenchmark, item.details[0].sportId)}
            </span>
          </Tooltip>
        </div>
        <div className='market'>
          <div className='market-info'>
            <span className='top-game-type-wrap'>
              [{isPlayingMatch(item.details[0].isInplay)}]
              <Tooltip title={getPlayNameByKc({code: item.details[0].kindsCode, name: item.details[0].betItemName, ctid: item.details[0].betItemCTID})}>
                <em className='pl-6 play-name-text'>{getPlayNameByKc({code: item.details[0].kindsCode, name: item.details[0].betItemName, ctid: item.details[0].betItemCTID})}</em>
              </Tooltip>
            </span>
            <span className='bet-game-type-text'>{chooseEuropeOrAsiaText(item.details[0].marketType, item.details[0].sportId)}</span>
          </div>
          <div className='team-win'>
            <Tooltip className={getBetTeamType(item.details[0])?'':'display-none'} title={`${getBetTeamType(item.details[0])}`}>
              {getBetTeamType(item.details[0])}
            </Tooltip>
            {
              isVisiableSecondText(item.details[0].betHandicap, item.details[0].betN, item.details[0].kindsCode) &&
              <em>{getBetHandiCapAtBetting(item.details[0].betHandicap, item.details[0].sportId)}</em>
            }
            {item.isReserve == 1 && <span className='resere-text'>[预约]</span>}
          </div>
          <div className='odd'>
            <div>@{formatCurrency(item.details[0].oddValue)}</div>
          </div>
        </div>
        <div className="amount-series">
          <div>
            <span>投注金额</span>
            <span>{formatCurrency((item.productAmountTotal) || 0)}</span>
          </div>
          <div>
            <span>最高可赢</span>
            <span className='text-right'>{formatCurrency((item.maxWinAmount) || 0) }</span>
          </div>
        </div>
      </div>
    ));
  };
  const getProductAmountTotal = ()=>{
    return _.reduce(orders, (result, item) => result + item.productAmountTotal, 0);
  };
  const getmaxWinAmountTotal = ()=>{
    const maxWinAmount =_.reduce(orders, (result, item) => result + item.maxWinAmount, 0);
    return maxWinAmount;
  };
  const mutipleBetOrder = ()=>{
    return (<>
      {
        orders[0].details.map((item, index) => (
          <div className="bet-item" key={item.orderId + index}>
            <div className='confirm-icon'>
              <DpIcon className='close' type='confirmed'/>
            </div>
            <div className="match-league">
              {item.leagueNameCn}
            </div>
            <div className="match-name">
              <Tooltip
                title={
                  <span>{item.homeTeamNameCn} V {item.awayTeamNameCn}
                    {displayHomeAwayScore(item.scoreBenchmark, item.sportId)}
                  </span>
                }
              >
                <span>{item.homeTeamNameCn} V {item.awayTeamNameCn}
                  {displayHomeAwayScore(item.scoreBenchmark, item.sportId)}
                </span>
              </Tooltip>
            </div>
            <div className='market'>
              <div className='market-info'>
                <span className='top-game-type-wrap'>
                  [{isPlayingMatch(item.isInplay)}]
                  <Tooltip title={getPlayNameByKc({code: item.kindsCode, name: item.betItemName, ctid: item.betItemCTID})}>
                    <em className='pl-6 play-name-text'>{getPlayNameByKc({code: item.kindsCode, name: item.betItemName, ctid: item.betItemCTID})}</em>
                  </Tooltip>
                </span>
                <span className='bet-game-type-text'>{chooseEuropeOrAsiaText(item.marketType, item.sportId)}</span>
              </div>
              <div className='team-win'>
                <Tooltip className={getBetTeamType(item)?'':'display-none'} title={`${getBetTeamType(item)}`}>{getBetTeamType(item)}</Tooltip>
                {
                  isVisiableSecondText(item.betHandicap, item.betN, item.kindsCode) &&
                  <em>{getBetHandiCapAtBetting(item.betHandicap, item.sportId)}</em>
                }
              </div>
              <div className='odd'>
                <div>@{formatCurrency(item.oddValue)}</div>
              </div>
            </div>
          </div>
        ))
      }
      {mutipleBetOrderSeries()}
      {mutipleBetOrderSeriesCount()}
    </>);
  };
  const mutipleBetOrderSeriesCount = ()=>{
    return (
      <div className="bet-item">
        <div className="amount-after-series-total">
          <div>
            <span>总投注 {orders.length}</span>
            <span>{formatCurrency(getProductAmountTotal() || 0)}</span>
          </div>
          <div>
            <span>预计总收益</span>
            <span className='theme-color'>{formatCurrency(getmaxWinAmountTotal() || 0)}</span>
          </div>
        </div>
      </div>
    );
  };
  const mutipleBetOrderSeries = ()=>{
    return orders.map((item) => (
      <div className="bet-item" key={item.id}>
        <div className='confirm-icon'>
          <DpIcon className='close' type='confirmed'/>
        </div>
        <div className="match-league-series">
          {getSeriesDigitsStr(item.seriesType, orders[0].details.length)}
        </div>
        <div className="amount-series">
          <div>
            <span>投注金额</span>
            <span>{formatCurrency((item.productAmountTotal) || 0)}</span>
          </div>
          <div>
            <span>最高可赢</span>
            <span className='text-right'>{formatCurrency((item.maxWinAmount) || 0)}</span>
          </div>
        </div>
      </div>
    ));
  };
  if (orders.length === 0) return null;
  return (
    <div className={styles.bet_list_onfrim_wrap}>
      <div className="bet-list">
        {
          orders[0].seriesType === 1 ? singleBetOrder() : mutipleBetOrder()
        }
      </div>
      {isExistConfirmed && (
        <div className='od-confirm'>
          您的订单已确认
        </div>
      )}
      <div className="action">
        <Button className="save" onClick={backOrdersDispaly}>
          保留选项
        </Button>
        <Button className="submit" type="primary" onClick={removeConfirmedOrders}>确认</Button>
      </div>
    </div>
  );
});
export default ConfrimedOrders;
