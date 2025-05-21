import React from "react";
import styled from "styled-components";

// Styled text component for the label
const PieLabelText = styled.text`
  fill: #5285ec; // Use the specified text color
  font-size: 10px;
  line-height: 13px; // line-height doesn't directly apply to SVG text/tspan in the same way as CSS
  font-family: inherit;
  text-anchor: ${(props) =>
    props.textAnchor || "start"}; // Apply text anchor from props
`;

const PieChart = ({ completed, total }) => {
  const size = 140; // SVG size
  const strokeWidth = 0; // No stroke
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  // Handle total === 0 to avoid division by zero and show 0%
  const completionRatio = total === 0 ? 0 : completed / total;
  const completedAngle = completionRatio * 360;

  // Calculate coordinates for the completed arc endpoint
  const radians = (angle) => (angle - 90) * (Math.PI / 180); // -90deg offset for starting from top
  const x = center + radius * Math.cos(radians(completedAngle));
  const y = center + radius * Math.sin(radians(completedAngle));

  // large-arc-flag is 1 if angle is > 180 degrees, 0 otherwise
  const largeArcFlag = completedAngle > 180 ? 1 : 0;

  // Sweep flag is 1 for clockwise, 0 for counter-clockwise. We want clockwise.
  const sweepFlag = 1;

  // Path for the completed slice
  const completedPath =
    completedAngle === 360
      ? `M ${center} ${center} m -${radius}, 0 a ${radius},${radius} 0 1,0 ${
          radius * 2
        },0 a ${radius},${radius} 0 1,0 -${radius * 2},0` // Draw full circle path if 100%
      : `M ${center} ${center} L ${center} ${
          center - radius
        } A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x} ${y} Z`;

  // --- Label Positioning ---
  // Use a fixed angle for the label position (e.g., 45 degrees)
  const fixedLabelAngle = 45; // Fixed angle in degrees
  const labelRadians = (fixedLabelAngle - 90) * (Math.PI / 180);

  // Start and end points for the label line
  const lineStart = {
    x: center + radius * 0.6 * Math.cos(labelRadians), // Start inside the circle
    y: center + radius * 0.6 * Math.sin(labelRadians),
  };
  const lineEnd = {
    x: center + radius * 1.4 * Math.cos(labelRadians), // End slightly outside the circle
    y: center + radius * 1.4 * Math.sin(labelRadians),
  };

  // Position for the label text (slightly further out from the line end)
  const textOffset = 35; // Pixels away from line end
  const textPosition = {
    x: center + (radius + textOffset) * Math.cos(labelRadians),
    y: center + (radius + textOffset) * Math.sin(labelRadians),
  };

  // Adjust text anchor based on label position
  const textAnchor = textPosition.x > center ? "start" : "end";

  // Hide label if completed is 0 or total is 0
  const showLabel = completed > 0 && total > 0;

  return (
    <svg
      width={size}
      height={size}
      style={{ display: "block", margin: "0 auto", overflow: "visible" }}
    >
      {/* Background circle (Total Tasks) */}
      <circle cx={center} cy={center} r={radius} fill="#e9ecef" />
      {/* Completed arc */}
      <path d={completedPath} fill="#5285EC" />

      {/* White border for separation */}
      {completed > 0 &&
        completed < total && ( // Only show border if not 0% or 100%
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#fff"
            strokeWidth="2"
          />
        )}

      {/* Label line and text (only show if completed > 0 and total > 0) */}
      {showLabel && (
        <>
          <line
            x1={lineStart.x}
            y1={lineStart.y}
            x2={lineEnd.x}
            y2={lineEnd.y}
            stroke="#5285EC" // Use the specified line color
            strokeWidth="1"
          />
          <PieLabelText
            x={textPosition.x}
            y={textPosition.y}
            textAnchor={textAnchor} // Dynamic text alignment
            dominantBaseline="middle" // Use dominant-baseline
          >
            <tspan x={textPosition.x} dy="-0.6em">
              Completed
            </tspan>{" "}
            {/* First line, adjusted up */}
            <tspan x={textPosition.x} dy="1.2em">
              Tasks
            </tspan>{" "}
            {/* Second line, adjusted down relative to first */}
          </PieLabelText>
        </>
      )}
    </svg>
  );
};

export default PieChart;
