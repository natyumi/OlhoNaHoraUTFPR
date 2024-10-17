interface IProgressionBar{
  type: string;
  points: number;
  progression: string;
  maxPoints: string;
}

export default function Progression({type, points, progression, maxPoints} : IProgressionBar) {
  return (
    <div className='flex flex-row gap-8 items-center'>
      <p className='font-bold'>Grupo {type}</p>
      <p>
        {points} / {maxPoints}
      </p>
    </div>
  );
}