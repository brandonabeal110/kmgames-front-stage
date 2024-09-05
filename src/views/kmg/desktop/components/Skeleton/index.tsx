import MatchSkeleton from './SkeletonMatchList';
import GameResultSkeleton from './SkeletonGameResultList';
import GameResultDetailSkeleton from './SkeletonGameResultDetail';

interface IProps {
  type: string;
  length?: number;
}

function DpSkeleton({type, length = 1}: IProps) {
  return (
    <div>
      {
        new Array(length).fill(0).map((_, idx) => <SkeletonComp type={type} key={idx} />)
      }
    </div>
  );
}

function SkeletonComp({type}: { type: IProps['type'] }) {
  switch (type) {
    case 'match':
      return <MatchSkeleton />;
    case 'games-result':
      return <GameResultSkeleton />;
    case 'game-result-detail':
      return <GameResultDetailSkeleton />;
    default:
      return null;
  }
}

export default React.memo(DpSkeleton);
