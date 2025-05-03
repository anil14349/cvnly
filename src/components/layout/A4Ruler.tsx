import React from 'react';

interface A4RulerProps {
  heightPx?: number; // Default: 1123px (A4 at 96dpi)
  unit?: 'cm' | 'in'; // Default: 'cm'
  showLabels?: boolean; // Show numeric labels
  style?: React.CSSProperties;
  contentHeightPx?: number; // actual resume content height
}

const A4_HEIGHT_PX = 1123; // 297mm at 96dpi
const A4_HEIGHT_CM = 29.7;
const CM_TO_PX = A4_HEIGHT_PX / A4_HEIGHT_CM;
const IN_TO_PX = 96; // 1 inch = 96px

const A4Ruler: React.FC<A4RulerProps> = ({
  heightPx = A4_HEIGHT_PX,
  unit = 'cm',
  showLabels = true,
  style = {},
  contentHeightPx,
}) => {
  const displayHeight = contentHeightPx || heightPx;
  const majorTick = unit === 'cm' ? 1 : 0.5; // 1cm or 0.5in
  const maxVal = unit === 'cm' ? A4_HEIGHT_CM : displayHeight / IN_TO_PX;
  const tickPx = unit === 'cm' ? CM_TO_PX : IN_TO_PX / 2;
  const ticks = [];

  for (let i = 0; i <= maxVal; i += majorTick) {
    ticks.push(i);
  }

  // Calculate horizontal page break positions for A4 pages based on displayHeight
  const pageBreaks = [];
  const pageHeightPx = heightPx;
  let curr = pageHeightPx;
  while (curr < displayHeight) {
    pageBreaks.push(curr);
    curr += pageHeightPx;
  }

  return (
    <div
      style={{
        width: 36,
        height: displayHeight,
        background: '#fafbfc',
        borderRight: '1px solid #e5e7eb',
        position: 'relative',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {/* Only horizontal page break markers and page numbers */}
      {pageBreaks.map((y, i) => (
        <>
          <div
            key={`page-break-${i}`}
            style={{
              position: 'absolute',
              top: y - 1,
              left: 0,
              width: '100%',
              height: 2,
              background: '#e74c3c',
              opacity: 0.8,
              zIndex: 2,
            }}
          />
          {/* Page number label */}
          <span
            key={`page-label-${i}`}
            style={{
              position: 'absolute',
              top: y - 12,
              left: 2,
              fontSize: 10,
              color: '#e74c3c',
              fontFamily: 'monospace',
              background: '#fff',
              padding: '0 2px',
              zIndex: 3,
              userSelect: 'none',
            }}
          >
            {`${i + 2}p`}
          </span>
        </>
      ))}
    </div>
  );
};

export default A4Ruler;
