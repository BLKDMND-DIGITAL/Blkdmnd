import React, { useEffect, useId, useLayoutEffect, useRef, CSSProperties, ReactNode, forwardRef } from 'react';
import './ElectricBorder.css';

interface ElectricBorderProps {
  children: ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  thickness?: number;
  className?: string;
  style?: CSSProperties;
}

const ElectricBorder = forwardRef<HTMLDivElement, ElectricBorderProps>(
  ({ children, color = '#ec9d34', speed = 1, chaos = 1, thickness = 2, className, style }, ref) => {
    const rawId = useId().replace(/[:]/g, '');
    const filterId = `turbulent-displace-${rawId}`;
    const svgRef = useRef<SVGSVGElement>(null);
    const localRef = useRef<HTMLDivElement>(null);
    const rootRef = (ref || localRef) as React.RefObject<HTMLDivElement>;
    const strokeRef = useRef<HTMLDivElement>(null);

    const updateAnim = () => {
      const svg = svgRef.current;
      const host = rootRef.current;
      if (!svg || !host) return;

      if (strokeRef.current) {
        strokeRef.current.style.filter = `url(#${filterId})`;
      }

      const width = Math.max(1, Math.round(host.clientWidth || host.getBoundingClientRect().width || 0));
      const height = Math.max(1, Math.round(host.clientHeight || host.getBoundingClientRect().height || 0));

      // FIX: Explicitly type SVG elements returned by querySelectorAll as SVGAnimateElement
      // to resolve errors on `setAttribute` and `beginElement` method access.
      const dyAnims = svg.querySelectorAll<SVGAnimateElement>('feOffset > animate[attributeName="dy"]');
      if (dyAnims.length >= 2) {
        dyAnims[0].setAttribute('values', `${height}; 0`);
        dyAnims[1].setAttribute('values', `0; -${height}`);
      }

      // FIX: Explicitly type SVG elements for the same reason as above.
      const dxAnims = svg.querySelectorAll<SVGAnimateElement>('feOffset > animate[attributeName="dx"]');
      if (dxAnims.length >= 2) {
        dxAnims[0].setAttribute('values', `${width}; 0`);
        dxAnims[1].setAttribute('values', `0; -${width}`);
      }

      const baseDur = 6;
      const dur = Math.max(0.001, baseDur / (speed || 1));
      // FIX: Spreading the NodeListOf elements into an array works correctly because they are correctly typed.
      [...dyAnims, ...dxAnims].forEach(a => a.setAttribute('dur', `${dur}s`));

      const disp = svg.querySelector<SVGFEDisplacementMapElement>('feDisplacementMap');
      if (disp) disp.setAttribute('scale', String(30 * (chaos || 1)));

      const filterEl = svg.querySelector<SVGFilterElement>(`#${CSS.escape(filterId)}`);
      if (filterEl) {
        filterEl.setAttribute('x', '-200%');
        filterEl.setAttribute('y', '-200%');
        filterEl.setAttribute('width', '500%');
        filterEl.setAttribute('height', '500%');
      }

      requestAnimationFrame(() => {
        // FIX: Spreading the NodeListOf elements ensures we are working with an array of correctly typed SVGAnimateElement.
        [...dyAnims, ...dxAnims].forEach(a => {
          if (typeof a.beginElement === 'function') {
            try {
              // FIX: `beginElement` is now accessible due to correct typing.
              a.beginElement();
            } catch {
              console.warn('ElectricBorder: beginElement failed, this may be due to a browser limitation.');
            }
          }
        });
      });
    };

    useEffect(() => {
      updateAnim();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [speed, chaos]);

    useLayoutEffect(() => {
      if (!rootRef.current) return;
      const ro = new ResizeObserver(() => updateAnim());
      ro.observe(rootRef.current);
      updateAnim();
      return () => ro.disconnect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const vars = {
      ['--electric-border-color']: color,
      ['--eb-border-width']: `${thickness}px`
    } as CSSProperties;

    return (
      <div ref={rootRef} className={`electric-border ${className ?? ''}`} style={{ ...vars, ...style }}>
        <svg ref={svgRef} className="eb-svg" aria-hidden focusable="false">
          <defs>
            <filter id={filterId} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
              <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
                <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
              </feOffset>

              <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
              <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
                <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
              </feOffset>

              <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
              <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
                <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
              </feOffset>

              <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
              <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
                <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
              </feOffset>

              <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
              <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
              <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
              <feDisplacementMap
                in="SourceGraphic"
                in2="combinedNoise"
                scale="30"
                xChannelSelector="R"
                yChannelSelector="B"
              />
            </filter>
          </defs>
        </svg>

        <div className="eb-layers">
          <div ref={strokeRef} className="eb-stroke" />
          <div className="eb-glow-1" />
          <div className="eb-glow-2" />
          <div className="eb-background-glow" />
        </div>

        <div className="eb-content">{children}</div>
      </div>
    );
  }
);

export default ElectricBorder;
