import classnames from 'classnames';
import {IGuideData} from '../..';
import style from './style.scss';

const GuideDetail = ({guide}: {guide: IGuideData}) => {
//
  return (
    <div>
      <div className={style.wrapper} >
        <div className='title'>{guide.title}</div>
        <div className='items'>
          <div className='subtitle'>{guide.subtitle}</div>
          <div className='content'>
            <div className='item'>
              <p className='target'>{guide.items.big.target}</p>
              <div className={classnames('status', {'lose': (guide.items.big.status === '全赢' || guide.items.big.status === '赢一半'), 'win': (guide.items.big.status === '全输' || guide.items.big.status === '输一半')})}>{guide.items.big.status}</div>
            </div>
            <div className='display'>
              <p className='sum'>{guide.sumGoal}</p>
              <p className='describe'>进球之和</p>
            </div>
            <div className='item'>
              <p className='target'>{guide.items.small.target}</p>
              <div className={classnames('status', {'lose': (guide.items.small.status === '全赢' || guide.items.small.status === '赢一半'), 'win': (guide.items.small.status === '全输' || guide.items.small.status === '输一半')})}>{guide.items.small.status}</div>
            </div>
          </div>
        </div>
      </div>


    </div>

  );
};

export default GuideDetail;
