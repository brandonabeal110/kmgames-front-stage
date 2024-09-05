import {Image, ImageProps} from 'antd';
import DpIcon from '../Icon';
import {useMemo, useState} from 'react';
import style from './style.scss';
interface IProps extends ImageProps {
  type?: 'league' | 'team';
  size?: number;
  active?: boolean;
}

const DpImage = (props: IProps) => {
  const [err, setErr] = useState(false);
  const errNode = useMemo(() => {
    switch (props.type) {
      case 'league':
        return <DpIcon className={props.className} type="league" />;
      case 'team':
        const {size = 20, active} = props;
        return <DpIcon active={active} width={size} height={size} className={props.className} type="team" />;
    }
  }, [props.type, props.active]);
  return ((!props.fallback && err) || !props.src) ? errNode : <Image preview={false} onError={() => setErr(true)} {...props} rootClassName={props.className} placeholder={<div className={style['error-wrap']} style={{flexShrink: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: `${props.size}`, height: `${props.size }`}}>{errNode}</div>}></Image>;
};

export default React.memo(DpImage);
