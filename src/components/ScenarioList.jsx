import { fmt } from '../utils/format';

export default function ScenarioList({
  displayRows,
  selected,
  onSelectScenario,
  prazo,
}) {
  return (
    <div className='mb-5'>
      <div>Cenários de entrada</div>
      <div className='flex flex-col gap-2'>
        {displayRows.map((row, i) => (
          <div
            key={i}
            className={`row-card ${selected === i ? 'active' : ''} ${row.isCustom ? 'custom-card' : ''}`}
            onClick={() => onSelectScenario(i)}
          >
            <div>
              <div
                className={`font-display text-lg font-bold ${row.isCustom ? 'text-warning' : 'text-primary'}`}
              >
                {row.pct}%
              </div>
              {row.isCustom && (
                <span className='bg-warning/15 text-warning text-xs px-1.5 py-0.5 rounded tracking-widest uppercase'>
                  Custom
                </span>
              )}
            </div>
            <div>
              <div className='text-xs text-subtle'>entrada</div>
              <div className='text-sm font-medium'>{fmt(row.entrada)}</div>
            </div>
            <div className='text-right'>
              <div className='text-xs text-subtle'>parcela/{prazo}x</div>
              <div className='text-sm font-medium text-foreground'>
                {fmt(row.parcela)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
