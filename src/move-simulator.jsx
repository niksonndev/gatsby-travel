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
  const [inputVeiculo, setInputVeiculo] = useState('150000');

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
    setInputVeiculo(v);
    const num = parseInt(v.replace(/\D/g, '')) || 0;
    if (num >= 10000 && num <= 150000) {
      setValorVeiculo(num);
      setSelected(0);
      setCustomEntrada('');
    }
  };

  const sliderPct = ((valorVeiculo - 10000) / (150000 - 10000)) * 100;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0f1e',
        fontFamily: "'DM Mono', 'Courier New', monospace",
        color: '#e8f4fd',
        padding: '0',
        overflowX: 'hidden',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0f1e; }
        ::-webkit-scrollbar-thumb { background: #1e5fa8; border-radius: 2px; }

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
        .detail-panel {
          background: rgba(30,95,168,0.08);
          border: 1px solid rgba(30,95,168,0.3);
          border-radius: 16px;
          padding: 24px;
        }
        .stat-block {
          background: rgba(255,255,255,0.04);
          border-radius: 10px;
          padding: 14px;
          text-align: center;
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

        .veiculo-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(74,144,217,0.4);
          border-radius: 8px;
          color: #4a90d9;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          padding: 8px 12px;
          width: 130px;
          outline: none;
          text-align: right;
          transition: border-color 0.2s;
        }
        .veiculo-input:focus { border-color: #4a90d9; }

        .slider-wrap {
          position: relative;
          padding: 8px 0 4px;
        }
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
        .bar-fill {
          height: 6px;
          border-radius: 3px;
          transition: width 0.4s ease;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.35s ease forwards; }
        .tag-custom {
          background: rgba(255,180,50,0.15);
          color: #ffb432;
          font-size: 9px;
          padding: 2px 6px;
          border-radius: 4px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .teto-badge {
          background: rgba(42,157,92,0.15);
          color: #2a9d5c;
          font-size: 9px;
          padding: 2px 7px;
          border-radius: 4px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .section-label {
          font-size: 11px;
          color: #4a7080;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0d1b3e 0%, #0a0f1e 100%)',
          borderBottom: '1px solid rgba(30,95,168,0.3)',
          padding: '24px 20px 18px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '180px',
            height: '180px',
            background:
              'radial-gradient(circle, rgba(30,95,168,0.25) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            fontSize: 10,
            color: '#4a90d9',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}
        >
          Move Brasil · Táxi e Aplicativos
        </div>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 24,
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 6,
          }}
        >
          Simulador de
          <br />
          Financiamento
        </div>
        <div style={{ fontSize: 11, color: '#6a8aaa' }}>
          Taxa teto: <span style={{ color: '#4a90d9' }}>12,25% a.a.</span>
          <span style={{ margin: '0 6px', opacity: 0.3 }}>·</span>
          Veículo: <span style={{ color: '#4a90d9' }}>{fmt(valorVeiculo)}</span>
          {valorVeiculo === 150000 && (
            <span style={{ marginLeft: 6 }} className='teto-badge'>
              teto
            </span>
          )}
        </div>
      </div>

      <div style={{ padding: '18px 16px', maxWidth: 520, margin: '0 auto' }}>
        {/* === VALOR DO VEÍCULO === */}
        <div
          style={{
            marginBottom: 22,
            background: 'rgba(74,144,217,0.05)',
            border: '1px solid rgba(74,144,217,0.15)',
            borderRadius: 14,
            padding: '16px 18px',
          }}
        >
          <div className='section-label' style={{ marginBottom: 14 }}>
            Valor do veículo
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 28,
                fontWeight: 800,
                color: '#4a90d9',
              }}
            >
              {fmt(valorVeiculo)}
            </div>
            <input
              className='veiculo-input'
              value={inputVeiculo}
              onChange={(e) => handleValorVeiculoInput(e.target.value)}
              placeholder='Ex: 80000'
            />
          </div>
          <div className='slider-wrap'>
            <input
              type='range'
              min='10000'
              max='150000'
              step='5000'
              value={valorVeiculo}
              onChange={(e) => handleValorVeiculoSlider(e.target.value)}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 10,
              color: '#3a5060',
              marginTop: 2,
            }}
          >
            <span>R$ 10k</span>
            <span>R$ 150k (teto)</span>
          </div>
        </div>

        {/* === PRAZO === */}
        <div style={{ marginBottom: 20 }}>
          <div className='section-label'>Prazo</div>
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
          <div className='section-label'>Simular outra entrada</div>
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
            <div style={{ fontSize: 11, color: '#ffb432', marginTop: 4 }}>
              Entrada: {fmt(customRow.entrada)} ({customRow.pct}%) · Financia:{' '}
              {fmt(customRow.financiado)}
            </div>
          )}
        </div>

        {/* === CENÁRIOS === */}
        <div style={{ marginBottom: 20 }}>
          <div className='section-label'>Cenários de entrada</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {displayRows.map((row, i) => (
              <div
                key={i}
                className={`row-card ${selected === i ? 'active' : ''} ${row.isCustom ? 'custom-card' : ''}`}
                onClick={() => setSelected(i)}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: 17,
                      fontWeight: 700,
                      color: row.isCustom ? '#ffb432' : '#4a90d9',
                    }}
                  >
                    {row.pct}%
                  </div>
                  {row.isCustom && <span className='tag-custom'>custom</span>}
                  {!row.isCustom && row.entrada === 0 && (
                    <span
                      style={{
                        fontSize: 9,
                        color: '#2a9d5c',
                        background: 'rgba(42,157,92,0.15)',
                        padding: '2px 6px',
                        borderRadius: 4,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                      }}
                    >
                      zero
                    </span>
                  )}
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#6a8aaa' }}>entrada</div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>
                    {fmt(row.entrada)}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, color: '#6a8aaa' }}>
                    parcela/{prazo}x
                  </div>
                  <div
                    style={{ fontSize: 14, fontWeight: 500, color: '#e8f4fd' }}
                  >
                    {fmt(row.parcela)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === DETALHE === */}
        {selectedRow && (
          <div
            className='detail-panel fade-up'
            key={`${selected}-${prazo}-${valorVeiculo}`}
          >
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: '#4a90d9',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
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
                <div
                  style={{ fontSize: 10, color: '#6a8aaa', marginBottom: 4 }}
                >
                  Entrada
                </div>
                <div
                  style={{ fontSize: 18, fontWeight: 500, color: '#4a90d9' }}
                >
                  {fmt(selectedRow.entrada)}
                </div>
              </div>
              <div className='stat-block'>
                <div
                  style={{ fontSize: 10, color: '#6a8aaa', marginBottom: 4 }}
                >
                  Financiado
                </div>
                <div style={{ fontSize: 18, fontWeight: 500 }}>
                  {fmt(selectedRow.financiado)}
                </div>
              </div>
              <div className='stat-block'>
                <div
                  style={{ fontSize: 10, color: '#6a8aaa', marginBottom: 4 }}
                >
                  Parcela ({prazo}x)
                </div>
                <div
                  style={{ fontSize: 18, fontWeight: 500, color: '#2a9d5c' }}
                >
                  {fmt(selectedRow.parcela)}
                </div>
              </div>
              <div className='stat-block'>
                <div
                  style={{ fontSize: 10, color: '#6a8aaa', marginBottom: 4 }}
                >
                  Total pago
                </div>
                <div style={{ fontSize: 18, fontWeight: 500 }}>
                  {fmt(selectedRow.totalPago)}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 11,
                  color: '#6a8aaa',
                  marginBottom: 6,
                }}
              >
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
              <div style={{ fontSize: 10, color: '#4a7080', marginTop: 4 }}>
                {(
                  (selectedRow.jurosTotal / selectedRow.financiado) *
                  100
                ).toFixed(1)}
                % sobre o valor financiado
              </div>
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 11,
                  color: '#6a8aaa',
                  marginBottom: 6,
                }}
              >
                <span style={{ color: '#4a90d9' }}>
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
                  className='bar-fill'
                  style={{
                    width: `${selectedRow.pct}%`,
                    background: '#1e5fa8',
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

        <div
          style={{
            marginTop: 16,
            padding: '12px 14px',
            background: 'rgba(255,180,50,0.04)',
            border: '1px solid rgba(255,180,50,0.12)',
            borderRadius: 10,
            fontSize: 10,
            color: '#7a6030',
            lineHeight: 1.7,
          }}
        >
          ⚠ Taxa teto de 12,25% a.a. = 2,5% (governo) + 8,5% (banco) + 1,25%
          (BNDES). Taxa real depende da instituição. Máximo elegível: R$
          150.000. Disponível a partir de 19/06/2026.
        </div>
      </div>
    </div>
  );
}
