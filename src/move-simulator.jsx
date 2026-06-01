import { useState } from 'react';

const TAXA_ANUAL_TETO = 12.25;
const ENTRADAS_PCT = [0, 10, 20, 30, 40, 50];

function calcPMT(principal, taxaMensal, meses) {
  if (taxaMensal === 0) return principal / meses;
  return (
    (principal * taxaMensal * Math.pow(1 + taxaMensal, meses)) /
    (Math.pow(1 + taxaMensal, meses) - 1)
  );
}

function fmt(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function fmtShort(v) {
  if (v >= 1000) return `R$ ${(v / 1000).toFixed(0)}k`;
  return fmt(v);
}

export default function App() {
  const taxaMensal = Math.pow(1 + TAXA_ANUAL_TETO / 100, 1 / 12) - 1;
  const [selected, setSelected] = useState(0);
  const [customEntrada, setCustomEntrada] = useState('');
  const [prazo, setPrazo] = useState(72);
  const [valorVeiculo, setValorVeiculo] = useState(150000);
  const [inputVeiculo, setInputVeiculo] = useState('150.000');

  const entradaCustomVal =
    customEntrada !== ''
      ? parseFloat(customEntrada.replace(/\D/g, '')) || 0
      : null;

  const rows = ENTRADAS_PCT.map((pct) => {
    const entrada = Math.round((valorVeiculo * pct) / 100);
    const financiado = valorVeiculo - entrada;
    const parcela = calcPMT(financiado, taxaMensal, prazo);
    const totalPago = parcela * prazo + entrada;
    const jurosTotal = totalPago - valorVeiculo;
    return { entrada, pct, financiado, parcela, totalPago, jurosTotal };
  });

  let customRow = null;
  if (
    entradaCustomVal !== null &&
    entradaCustomVal >= 0 &&
    entradaCustomVal < valorVeiculo
  ) {
    const financiado = valorVeiculo - entradaCustomVal;
    const pctCalc = ((entradaCustomVal / valorVeiculo) * 100).toFixed(1);
    const parcela = calcPMT(financiado, taxaMensal, prazo);
    const totalPago = parcela * prazo + entradaCustomVal;
    const jurosTotal = totalPago - valorVeiculo;
    customRow = {
      entrada: entradaCustomVal,
      pct: pctCalc,
      financiado,
      parcela,
      totalPago,
      jurosTotal,
      isCustom: true,
    };
  }

  const displayRows = customRow ? [...rows, customRow] : rows;
  const selectedRow = displayRows[selected] ?? displayRows[0];

  const handleValorVeiculoSlider = (v) => {
    const val = parseInt(v);
    setValorVeiculo(val);
    setInputVeiculo(String(val));
    setSelected(0);
    setCustomEntrada('');
  };

  const handleValorVeiculoInput = (v) => {
    const num = parseInt(v.replace(/\D/g, '')) || 0;
    setInputVeiculo(num.toLocaleString('pt-BR'));
    if (num >= 10000 && num <= 150000) {
      setValorVeiculo(num);
      setSelected(0);
      setCustomEntrada('');
    }
  };

  const sliderPct = ((valorVeiculo - 10000) / (150000 - 10000)) * 100;

  return (
    <div className='min-h-screen overflow-x-hidden'>
      <style>{`
        .row-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 14px 18px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: grid;
          grid-template-columns: 68px 1fr 1fr;
          align-items: center;
          gap: 8px;
        }
        .row-card:hover {
          background: rgba(30,95,168,0.15);
          border-color: rgba(30,95,168,0.4);
          transform: translateX(3px);
        }
        .row-card.active {
          background: rgba(30,95,168,0.2);
          border-color: #1e5fa8;
          transform: translateX(3px);
        }
        .row-card.custom-card {
          border-style: dashed;
          border-color: rgba(255,180,50,0.4);
        }
        .row-card.custom-card.active {
          border-color: #ffb432;
          background: rgba(255,180,50,0.08);
        }
        .prazo-btn {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: #a0b4cc;
          border-radius: 8px;
          padding: 8px 14px;
          cursor: pointer;
          font-family: inherit;
          font-size: 13px;
          transition: all 0.15s;
        }
        .prazo-btn.active {
          background: #1e5fa8;
          border-color: #1e5fa8;
          color: #fff;
        }
        .custom-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,180,50,0.3);
          border-radius: 8px;
          color: #ffb432;
          font-family: inherit;
          font-size: 13px;
          padding: 8px 12px;
          width: 100%;
          outline: none;
          transition: border-color 0.2s;
        }
        .custom-input:focus { border-color: #ffb432; }

        input[type=range] {
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 2px;
          outline: none;
          cursor: pointer;
          background: linear-gradient(
            to right,
            #1e5fa8 0%,
            #1e5fa8 ${sliderPct}%,
            rgba(255,255,255,0.1) ${sliderPct}%,
            rgba(255,255,255,0.1) 100%
          );
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #4a90d9;
          border: 2px solid #0a0f1e;
          box-shadow: 0 0 8px rgba(74,144,217,0.5);
          transition: box-shadow 0.2s;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          box-shadow: 0 0 14px rgba(74,144,217,0.8);
        }
      `}</style>

      {/* Header */}
      <div className='bg-linear-to-br from-surface to-base border-b border-[rgba(30,95,168,0.3)] relative overflow-hidden'>
        <div className='max-w-lg mx-auto px-5 pt-6 pb-5'>
          <div className='absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[radial-gradient(circle,rgba(30,95,168,0.25)_0%,transparent_70%)]' />

          <div className='text-xs text-primary tracking-[3px] uppercase mb-1.5'>
            Move Brasil · Táxi e Aplicativos
          </div>

          <div className='font-display text-2xl font-extrabold leading-tight mb-1.5 text-foreground'>
            Simulador de
            <br />
            Financiamento
          </div>

          <div className='text-sm text-subtle'>
            Taxa teto: <span className='text-primary'>12,25% a.a.</span>
            <span className='mx-1.5 opacity-30'>·</span>
            Veículo: <span className='text-primary'>{fmt(valorVeiculo)}</span>
            {valorVeiculo === 150000 && (
              <span className='ml-1.5 text-xs bg-success/15 text-success px-1.75 py-0.5 rounded tracking-[1px] uppercase'>
                teto
              </span>
            )}
          </div>
        </div>
      </div>

      <div className='px-4 py-4.5 max-w-130 mx-auto'>
        {/* === VALOR DO VEÍCULO === */}
        <div className='mb-5.5 bg-primary/5 border border-primary/15 rounded-[14px] px-4.5 py-4'>
          <div className='text-xs text-subtle/70 tracking-[2px] uppercase mb-3.5'>
            Valor do veículo
          </div>
          <div className='flex flex-col gap-2 mb-3 sm:flex-row sm:items-center sm:justify-between'>
            <div className='font-display text-3xl font-extrabold text-primary'>
              {fmt(valorVeiculo)}
            </div>
            <input
              className='bg-white/5 border border-[rgba(74,144,217,0.4)] rounded-lg text-primary text-sm font-medium px-3 ml-auto sm:ml-0 py-2 w-full max-w-25 sm:w-28 outline-none text-right transition-colors duration-200 focus:border-primary'
              value={inputVeiculo}
              onChange={(e) => handleValorVeiculoInput(e.target.value)}
              placeholder='Ex: 80000'
            />
          </div>
          <div className='relative py-2 pb-1'>
            <input
              type='range'
              min='10000'
              max='150000'
              step='5000'
              value={valorVeiculo}
              onChange={(e) => handleValorVeiculoSlider(e.target.value)}
            />
          </div>
          <div className='flex justify-between text-xs text-subtle/50 mt-0.5'>
            <span>R$ 10k</span>
            <span>R$ 150k (teto)</span>
          </div>
        </div>

        {/* === PRAZO === */}
        <div style={{ marginBottom: 20 }}>
          <div>Prazo</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[24, 36, 48, 60, 72].map((p) => (
              <button
                key={p}
                className={`prazo-btn ${prazo === p ? 'active' : ''}`}
                onClick={() => setPrazo(p)}
              >
                {p}x
              </button>
            ))}
          </div>
        </div>

        {/* === ENTRADA CUSTOMIZADA === */}
        <div style={{ marginBottom: 20 }}>
          <div>Simular outra entrada</div>
          <input
            className='custom-input'
            placeholder={`Ex: ${Math.round(valorVeiculo * 0.15).toLocaleString('pt-BR')}`}
            value={customEntrada}
            onChange={(e) => {
              setCustomEntrada(e.target.value);
              if (e.target.value) setSelected(displayRows.length);
            }}
          />
          {customRow && (
            <div className='text-xs text-warning mt-1'>
              Entrada: {fmt(customRow.entrada)} ({customRow.pct}%) · Financia:{' '}
              {fmt(customRow.financiado)}
            </div>
          )}
        </div>

        {/* === CENÁRIOS === */}
        <div className='mb-5'>
          <div>Cenários de entrada</div>
          <div className='flex flex-col gap-2'>
            {displayRows.map((row, i) => (
              <div
                key={i}
                className={`row-card ${selected === i ? 'active' : ''} ${row.isCustom ? 'custom-card' : ''}`}
                onClick={() => setSelected(i)}
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
                <div style={{ textAlign: 'right' }}>
                  <div className='text-xs text-subtle'>parcela/{prazo}x</div>
                  <div className='text-sm font-medium text-foreground'>
                    {fmt(row.parcela)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === DETALHE === */}
        {selectedRow && (
          <div className='bg-accent/8 border border-accent/30 rounded-2xl p-6'>
            <div className='font-display text-xs font-bold text-primary tracking-[2px] uppercase mb-4'>
              Detalhamento
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div className='stat-block'>
                <div className='text-xs text-subtle mb-1'>Entrada</div>
                <div className='text-lg font-medium text-primary'>
                  {fmt(selectedRow.entrada)}
                </div>
              </div>
              <div className='stat-block'>
                <div className='text-xs text-subtle mb-1'>Financiado</div>
                <div className='text-lg font-medium text-foreground'>
                  {fmt(selectedRow.financiado)}
                </div>
              </div>
              <div className='stat-block'>
                <div className='text-xs text-subtle mb-1'>
                  Parcela ({prazo}x)
                </div>
                <div className='text-lg font-medium text-success'>
                  {fmt(selectedRow.parcela)}
                </div>
              </div>
              <div className='stat-block'>
                <div className='text-xs text-subtle mb-1'>Total pago</div>
                <div className='text-lg font-medium'>
                  {fmt(selectedRow.totalPago)}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div className='flex justify-between text-xs text-subtle mb-1.5'>
                <span>Custo do crédito (juros)</span>
                <span style={{ color: '#e87070' }}>
                  {fmt(selectedRow.jurosTotal)}
                </span>
              </div>
              <div
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 3,
                  height: 6,
                }}
              >
                <div
                  className='bar-fill'
                  style={{
                    width: `${Math.min((selectedRow.jurosTotal / selectedRow.financiado) * 100, 100)}%`,
                    background: 'linear-gradient(90deg, #1e5fa8, #e87070)',
                  }}
                />
              </div>
              <div className='text-xs text-subtle/70 mt-1'>
                {(
                  (selectedRow.jurosTotal / selectedRow.financiado) *
                  100
                ).toFixed(1)}
                % sobre o valor financiado
              </div>
            </div>

            <div>
              <div className='flex justify-between text-xs text-subtle mb-1.5'>
                <span className='text-primary'>
                  ▪ Entrada {selectedRow.pct}%
                </span>
                <span style={{ color: '#a0b4cc' }}>
                  ▪ Financiado {(100 - parseFloat(selectedRow.pct)).toFixed(0)}%
                </span>
              </div>
              <div
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 3,
                  height: 8,
                  display: 'flex',
                  overflow: 'hidden',
                }}
              >
                <div
                  className='bar-fill bg-accent'
                  style={{
                    width: `${selectedRow.pct}%`,
                  }}
                />
                <div
                  className='bar-fill'
                  style={{
                    width: `${100 - parseFloat(selectedRow.pct)}%`,
                    background: 'rgba(255,255,255,0.12)',
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <div className='mt-4 px-3.5 py-3 bg-warning/4 border border-warning/12 rounded-xs text-xs text-[#7a6030] leading-[1.7]'>
          ⚠ Taxa teto de 12,25% a.a. = 2,5% (governo) + 8,5% (banco) + 1,25%
          (BNDES). Taxa real depende da instituição. Máximo elegível: R$
          150.000. Disponível a partir de 19/06/2026.
        </div>
      </div>
    </div>
  );
}
